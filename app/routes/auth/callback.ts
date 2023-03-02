import type { LoaderArgs } from "@remix-run/cloudflare";
import { authenticator } from "../../lib/auth.server";

export let loader = ({ request }: LoaderArgs) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
