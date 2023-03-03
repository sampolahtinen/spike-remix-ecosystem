import "@looma/core/dist/style.css";
import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { cssBundleHref } from "@remix-run/css-bundle";
import globalStyles from "./styles/global.css";
import lumosStyles from "@looma/core/dist/style.css";
import tailwindStyles from "./styles/tailwind.css";
import { LoomaProvider } from "@looma/core";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: lumosStyles,
    },
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: cssBundleHref },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <LoomaProvider theme="light">
          <Outlet />
        </LoomaProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
