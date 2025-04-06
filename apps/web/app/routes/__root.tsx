import { HomeIcon } from "@heroicons/react/20/solid";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";

import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@lorenz/ui/sidebar";
import { SidebarLayout } from "@lorenz/ui/sidebar-layout";

// @ts-ignore
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Lorenz",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SidebarLayout
          sidebar={
            <Sidebar>
              <SidebarBody>
                <SidebarSection>
                  <SidebarItem current>
                    <HomeIcon />
                    <SidebarLabel>Home</SidebarLabel>
                  </SidebarItem>
                </SidebarSection>
              </SidebarBody>
            </Sidebar>
          }
          navbar={<div>Navbar</div>}
        >
          {children}
          <Scripts />
        </SidebarLayout>
      </body>
    </html>
  );
}
