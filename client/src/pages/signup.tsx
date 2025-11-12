import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { Eye, EyeOff } from "lucide-react";
import logoUrl from "@assets/Future_Proofer_Logo-ig-square-1080-1080-removebg-preview_1762643734864.png";

// Declare global types for Google Identity Services
declare global {
  interface Window {
    google: any;
  }
}

export default function Signup() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Google Sign-In
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: (import.meta as any).env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button')!,
          { theme: 'outline', size: 'large', width: '100%' }
        );
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = async (response: any) => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: response.credential }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Google authentication failed');
      }

      const data = await res.json();
      // Store JWT token
      localStorage.setItem('token', data.token);
      // Redirect to onboarding
      setLocation("/onboarding");
    } catch (err) {
      setError((err as Error).message);
      console.error("Google sign-in failed:", err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    console.log("Signup attempt:", { fullName, email, password });

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      let data;
      if (!response.ok) {
        let errorMsg = `Signup failed: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (parseErr) {
          console.error('Failed to parse error response:', parseErr);
        }
        throw new Error(errorMsg);
      }

      try {
        data = await response.json();
      } catch (parseErr) {
        throw new Error('Invalid server response');
      }

      localStorage.setItem('token', data.token);
      // On successful signup, redirect to onboarding
      setLocation("/onboarding");
    } catch (err) {
      setError((err as Error).message);
      console.error("Signup failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src={logoUrl} 
            alt="Future Proofer" 
            className="h-16 mx-auto mb-4 cursor-pointer" 
            onClick={() => setLocation('/')}
          />
          <h1 className="font-serif text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Start your journey to a future-proof career</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Sign Up</CardTitle>
            <CardDescription>Get started with your free account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                  <p>{error}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  data-testid="input-fullname"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required data-testid="checkbox-terms" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg" data-testid="button-signup" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div id="google-signin-button"></div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => console.log('Microsoft signup')}
                  data-testid="button-microsoft"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 23 23">
                    <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  Microsoft
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setLocation('/login')}
                  className="text-primary font-medium hover:underline"
                  data-testid="link-login"
                >
                  Log in
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
