import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "@/components/theme-provider";
import Landing from "@/pages/landing";
import { Switch, Route } from "wouter";
import Signup from "@/pages/signup";
import Onboarding from "@/pages/onboarding";
import Login from "@/pages/login";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
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