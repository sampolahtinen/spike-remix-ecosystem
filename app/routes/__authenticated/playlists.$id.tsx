import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/lib/auth.server";
import { prisma } from "~/lib/db.server";

export async function loader({ params, request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(`/login`);
  }

  const playlist = await prisma.playlist.findUniqueOrThrow({
    where: {
      id: params.id,
    },
    include: {
      tracks: {
        include: {
          artist: true,
        },
      },
    },
  });

  return json(playlist);
}

export default function Playlist() {
  const playlist = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Playlist: {playlist.name}</h1>
      <ul>
        {playlist.tracks.map((track) => (
          <Link key={track.id} to={`/playlists/${playlist.id}`}>
            <li>
              {track.artist.name} - {track.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
