import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

import { authenticator } from "../../lib/auth.server";

export let loader = async ({ context }: LoaderArgs) => {
  console.log(`This is fine, it logs .dev.vars`);
  console.log(context);
  return redirect("/login");
};

export let action = ({ request, context }: ActionArgs) => {
  return authenticator.authenticate("auth0", request, { context });
};
