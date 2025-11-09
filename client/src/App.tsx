import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Insights from "@/pages/insights";
import Learning from "@/pages/learning";
import Chat from "@/pages/chat";
import Settings from "@/pages/settings";
import Onboarding from "@/pages/onboarding";
import BusinessMate from "@/pages/businessmate";
import ThinkForge from "@/pages/thinkforge";
import GrowthStrategies from "@/pages/growth-strategies";
import SystemsThinking from "@/pages/systems-thinking";
import LearningPaths from "@/pages/learning-paths";
import NotFound from "@/pages/not-found";

function MainAppRouter() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/insights" component={Insights} />
      <Route path="/learning" component={Learning} />
      <Route path="/chat" component={Chat} />
      <Route path="/settings" component={Settings} />
      <Route path="/businessmate" component={BusinessMate} />
      <Route path="/thinkforge" component={ThinkForge} />
      <Route path="/growth-strategies" component={GrowthStrategies} />
      <Route path="/systems-thinking" component={SystemsThinking} />
      <Route path="/learning-paths" component={LearningPaths} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const [activeItem, setActiveItem] = useState("/dashboard");
  const [userMode] = useState<"career" | "business">("career");

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar 
          activeItem={activeItem} 
          onNavigate={setActiveItem}
          userMode={userMode}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container max-w-7xl mx-auto p-6 md:p-8">
              <MainAppRouter />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="*">
              <AppLayout />
            </Route>
          </Switch>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
