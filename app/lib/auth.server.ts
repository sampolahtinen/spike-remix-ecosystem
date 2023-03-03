import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import type { Auth0Profile } from "remix-auth-auth0";
import { Auth0Strategy } from "remix-auth-auth0";
import { env } from "../../.env.auth";
import { prisma } from "./db.server";

interface User {
  readonly accessToken: string;
  readonly auth0UserId: string;
}

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: `_session`, // use any name you want here
    sameSite: `lax`, // this helps with CSRF
    path: `/`, // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [env.COOKIE_SECRET], // replace this with an actual secret
    secure: false, // TODO,
  },
});

export const authenticator = new Authenticator<User>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: env.AUTH0_CALLBACK_URL,
    clientID: env.AUTH0_CLIENT_ID,
    clientSecret: env.AUTH0_CLIENT_SECRET,
    domain: env.AUTH0_TENANT_DOMAIN,
    scope: `openid profile email`,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    const { displayName, emails } = profile;

    const userMetadata = profile._json as Auth0Profile["_json"] & {
      auth0UserId: string;
    };

    console.log(`SUCCESS`);
    console.log(accessToken);
    console.log(`profile`, profile);

    if (displayName && emails && userMetadata) {
      try {
        const createdUser = await prisma.user.upsert({
          where: { auth0UserId: userMetadata.auth0UserId },
          update: {
            email: emails[0].value,
            name: displayName,
          },
          create: {
            email: emails[0].value,
            name: displayName,
            auth0UserId: userMetadata.auth0UserId,
          },
        });
        console.log(`createdUser`, createdUser);
      } catch (error) {
        console.log(error);
        // throw new Error(`Access denied`);
      }
    }

    return { accessToken, auth0UserId: userMetadata.auth0UserId };
  }
);

authenticator.use(auth0Strategy);
