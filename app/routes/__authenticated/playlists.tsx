import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/lib/auth.server";
import { prisma } from "~/lib/db.server";

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);
  console.log(`user`, user);

  if (!user) {
    return redirect(`/login`);
  }

  const prismaUser = await prisma.user.findUniqueOrThrow({
    where: {
      auth0UserId: user.auth0UserId,
    },
  });

  const playlists = await prisma.playlist.findMany({
    where: {
      userId: prismaUser.id,
    },
  });

  return json(playlists);
}

export default function Playlists() {
  const playlists = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <Link key={playlist.id} to={`/playlists/${playlist.id}`}>
            <li>{playlist.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
