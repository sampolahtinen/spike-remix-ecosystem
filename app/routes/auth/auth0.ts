import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

import { authenticator } from "../../lib/auth.server";

export let loader = async ({ context }: LoaderArgs) => {
  return redirect("/login");
};

export let action = async ({ request, context }: ActionArgs) => {
  // if (await authenticator.isAuthenticated(request)) {
  //   return redirect("/");
  // }
  return authenticator.authenticate("auth0", request);
};
