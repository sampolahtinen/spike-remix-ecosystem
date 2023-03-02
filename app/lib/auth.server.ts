import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       AUTH0_CLIENT_ID: string;
//       AUTH0_CLIENT_SECRET: string;
//       AUTH0_TENANT_DOMAIN: string;
//       AUTH0_CALLBACK_URL: string;
//       COOKIE_SECRET: string;
//     }
//   }
// }

interface User {
  readonly accessToken: string;
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
    // callbackURL: env.AUTH0_CALLBACK_URL,
    callbackURL: env.AUTH0_CALLBACK_URL,
    clientID: env.AUTH0_CLIENT_ID,
    clientSecret: env.AUTH0_CLIENT_SECRET,
    domain: env.AUTH0_TENANT_DOMAIN,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    console.log(`SUCCESS`);
    console.log(accessToken);
    // const decoded = jwt.decode(accessToken);
    // console.log(`decoded`, decoded);

    return { accessToken };
    // return User.findOrCreate({ email: profile.emails[0].value });
  }
);

authenticator.use(auth0Strategy);
