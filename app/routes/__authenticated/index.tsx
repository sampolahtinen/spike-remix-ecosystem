import type { LoaderArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

export async function loader({ request }: LoaderArgs) {
  return redirect(`/demos`);
}
