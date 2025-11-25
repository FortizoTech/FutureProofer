import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

type AuthLayoutProps = React.PropsWithChildren<{}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [location, navigate] = useLocation();

  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={style}>
      <div className="flex min-h-screen w-full">
        <AppSidebar activeItem={location} userMode="career" onNavigate={(p) => navigate(p)} />
        <SidebarInset>
          {/* Top header bar */}
          <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger />
            <div className="flex-1" />
            <ThemeToggle />
          </header>

          {/* Main content container */}
          <div className="p-6">
            <div className="container mx-auto max-w-7xl">
              {children}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-auto border-t py-6">
            <div className="container mx-auto max-w-7xl px-6 text-sm text-muted-foreground">
              © 2024 Fortizo Technologies. All rights reserved.
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
