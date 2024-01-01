import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Header } from "./components/Header";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Roboto:ital,wght@0,300;0,400;0,700;1,300&family=Source+Code+Pro:ital@0;1&display=swap'}
];

export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { name: "theme-color", content: "#000000" },
  { name: "description", content: "Ethan Brouwer's personal website" },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <title>Ethan Brouwer</title>
        <Meta />
        <Links />
      </head>
      <body className="font-sans">
        <Header />
        <div className="flex justify-center">
          <div className="grow min-h-screen max-w-3xl pt-0 pb-12 px-2.5">
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
