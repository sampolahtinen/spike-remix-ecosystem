import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import { Button } from "@looma/core";
import { sprinkles } from "~/styles/sprinkles.css";

// export async function loader({ request }: LoaderArgs) {
//   const mammoth = await getMammothClientForRequest(request);
//   const {
//     me: { projects, ...me },
//   } = await mammoth.query({
//     me: {
//       handle: true,
//       image: true,
//       projects: [
//         { isAccelerate: true },
//         {
//           id: true,
//         },
//       ],
//     },
//   });
//   const betaUser = await prisma.betaUsers.findUnique({
//     where: { handle: me.handle },
//   });

//   const session = await getSessionForRequest(request);

//   return jsonWithGlobalToast({
//     session,
//     data: {
//       me: {
//         ...me,
//         hasPaymentMethod: !!betaUser!.stripePaymentMethodId,
//         projects: {
//           createdAmount: projects.length,
//         },
//       },
//     },
//   });
// }

export default function Index() {
  const matches = useMatches();
  // const { me, message } = useLoaderData<typeof loader>();

  return (
    <div className="h-screen">
      <Header />
      <div
        className={sprinkles({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 100,
        })}
      >
        <Outlet />
      </div>
    </div>
  );
}

const Header = () => (
  <div
    className={sprinkles({
      borderBottom: "default",
      display: "flex",
      mb: "4",
    })}
  >
    <Link to="/demos">
      <Button type="button" variant="secondary">
        Demos
      </Button>
    </Link>
    <Link to="/playlists">
      <Button type="button" variant="secondary">
        Playlists
      </Button>
    </Link>
    <Link
      className={sprinkles({
        alignSelf: "flex-end",
        ml: "auto",
      })}
      to="/auth/logout"
    >
      <Button type="button">Log out</Button>
    </Link>
  </div>
);
