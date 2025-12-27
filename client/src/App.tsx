import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "@/components/theme-provider";
import Landing from "@/pages/landing";
import { Switch, Route } from "wouter";
import Signup from "@/pages/signup";
import Onboarding from "@/pages/onboarding";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Insights from "@/pages/insights";
import LearningPaths from "@/pages/learning-paths";
import BusinessMate from "@/pages/businessmate";
import ThinkForge from "@/pages/thinkforge";
import Settings from "@/pages/settings";
import GrowthStrategies from "@/pages/growth-strategies";
import SystemsThinking from "@/pages/systems-thinking";
import Chat from "@/pages/chat";
import Learning from "./pages/learning";
import MasterclassPlayer from "./pages/masterclass-player";
import Connect from "@/pages/connect";
import AuthLayout from "@/components/auth-layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Switch>
            {/* Public routes */}
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/onboarding" component={Onboarding} />

            {/* Authenticated routes */}
            <Route path="/dashboard">
              {() => (
                <AuthLayout>
                  <Dashboard />
                </AuthLayout>
              )}
            </Route>
            <Route path="/insights">
              {() => (
                <AuthLayout>
                  <Insights />
                </AuthLayout>
              )}
            </Route>
            <Route path="/learning-paths">
              {() => (
                <AuthLayout>
                  <LearningPaths />
                </AuthLayout>
              )}
            </Route>

            <Route path="/businessmate">
              {() => (
                <AuthLayout>
                  <BusinessMate />
                </AuthLayout>
              )}
            </Route>
            <Route path="/thinkforge">
              {() => (
                <AuthLayout>
                  <ThinkForge />
                </AuthLayout>
              )}
            </Route>
            <Route path="/settings">
              {() => (
                <AuthLayout>
                  <Settings />
                </AuthLayout>
              )}
            </Route>
            <Route path="/growth-strategies">
              {() => (
                <AuthLayout>
                  <GrowthStrategies />
                </AuthLayout>
              )}
            </Route>
            <Route path="/systems-thinking">
              {() => (
                <AuthLayout>
                  <SystemsThinking />
                </AuthLayout>
              )}
            </Route>
            <Route path="/chat">
              {() => (
                <AuthLayout>
                  <Chat />
                </AuthLayout>
              )}
            </Route>

            <Route path="/learning">
              {() => (
                <AuthLayout>
                  <Learning />
                </AuthLayout>
              )}
            </Route>
            <Route path="/learning/masterclass/:id">
              {() => (
                <AuthLayout>
                  <MasterclassPlayer />
                </AuthLayout>
              )}
            </Route>
            <Route path="/connect">
              {() => (
                <AuthLayout>
                  <Connect />
                </AuthLayout>
              )}
            </Route>

            {/* Default route for 404 */}
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}