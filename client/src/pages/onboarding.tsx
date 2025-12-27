
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeSelector } from "@/components/mode-selector";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import logoUrl from "@assets/Future_Proofer_Logo-ig-square-1080-1080-removebg-preview_1762643734864.png";
import { useLocation } from "wouter";
import { useUser } from "@/context/user-context";
import { AnimatedBackground } from "@/components/animated-backgrounds";
import { cn } from "@/lib/utils";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { updateUser } = useUser();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"career" | "business">();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocationInput] = useState("");
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState("");

  const skills = [
    "Data Science", "Python", "Machine Learning", "Web Development",
    "Digital Marketing", "Project Management", "Cloud Computing", "Business Analytics"
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleGetStarted = () => {
    // Determine primary career based on selected skills
    const careerMapping: Record<string, string> = {
      "Data Science": "Data Science",
      "Machine Learning": "Data Science",
      "Python": "Data Science",
      "Web Development": "Web Development",
      "Digital Marketing": "Digital Marketing",
      "Project Management": "Project Management",
      "Cloud Computing": "Cloud Computing",
      "Business Analytics": "Business Analytics"
    };

    const selectedCareer = selectedSkills.length > 0
      ? careerMapping[selectedSkills[0]] || selectedSkills[0]
      : "";

    // Save all data to UserContext
    updateUser({
      fullName,
      location,
      selectedCareer,
      selectedSkills,
      userType: mode || 'career',
      bio: goals,
    });

    // Navigate to dashboard
    setLocation('/dashboard');
  };

  const progress = (step / 4) * 100;

  // Updated styles
  const ghostInputClass = "border-0 border-b border-white/20 bg-transparent rounded-none px-0 py-2 h-auto text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/50";
  const labelClass = "text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2 block";

  // Increased transparency: bg-white/8
  const glassCardClass = "bg-white/8 backdrop-blur-3xl border-white/15 shadow-2xl rounded-3xl overflow-hidden min-h-[500px] flex flex-col border";

  const primaryButtonClass = "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 rounded-full px-8";
  const outlineButtonClass = "border-white/20 hover:bg-white/5 text-muted-foreground hover:text-foreground rounded-full px-6";

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-y-auto font-sans">
      <AnimatedBackground step={step} className="opacity-100" />

      {/* Fixed Header */}
      <div className="fixed inset-x-0 top-0 z-50 bg-background/60 backdrop-blur-md border-b border-white/10 px-6 py-4 transition-all">
        <div className="max-w-4xl mx-auto text-center">
          <img src={logoUrl} alt="Future Proofer" className="h-10 w-10 mx-auto mb-3 drop-shadow-2xl" />
          <h1 className="font-serif text-3xl md:text-4xl font-light mb-1 tracking-tight bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent drop-shadow-lg relative inline-block">
            Future Proofer
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 blur-xl -z-10" />
          </h1>
          <p className="text-muted-foreground font-light tracking-wide uppercase text-[10px]">
            AI Foresight Engine Initialization
          </p>
        </div>
      </div>

      {/* Fixed Progress Bar */}
      <div className="fixed top-32 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-md mx-auto px-6">
          <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center font-medium tracking-widest uppercase">
            Step {step} / 4
          </p>
        </div>
      </div>

      {/* Main Content with top padding */}
      <div className="w-full max-w-4xl z-10 relative pt-48 pb-10 px-6 flex-1 flex flex-col">
        <Card className={glassCardClass}>
          {step === 1 && (
            <>
              <CardHeader className="p-8 md:p-10 pb-0 text-center">
                <CardTitle className="font-serif text-3xl font-light tracking-tight">Choose Your Focus</CardTitle>
                <CardDescription className="text-muted-foreground/80 font-light text-lg">Select the lens through which you want to view the future</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                <div className="scale-105 transform transition-transform duration-500">
                  <ModeSelector selected={mode} onSelect={setMode} />
                </div>
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!mode}
                    data-testid="button-next-step"
                    className={primaryButtonClass}
                    size="lg"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader className="p-8 md:p-10 pb-0">
                <CardTitle className="font-serif text-3xl font-light tracking-tight">Identity Calibration</CardTitle>
                <CardDescription className="text-muted-foreground/80 font-light text-lg">Establish your baseline for accurate predictions</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <Label htmlFor="fullname" className={labelClass}>Full Name</Label>
                    <Input
                      id="fullname"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      data-testid="input-fullname"
                      className={ghostInputClass}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className={labelClass}>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-email"
                      className={ghostInputClass}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="location" className={labelClass}>Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocationInput(e.target.value)}
                      data-testid="input-location"
                      className={ghostInputClass}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="industry" className={labelClass}>Industry</Label>
                    <Input
                      id="industry"
                      placeholder="Technology"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      data-testid="input-industry"
                      className={ghostInputClass}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-8 pt-4 border-t border-white/5">
                  <Button variant="outline" onClick={() => setStep(1)} data-testid="button-back" className={outlineButtonClass}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} data-testid="button-next-step" className={primaryButtonClass}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader className="p-8 md:p-10 pb-0">
                <CardTitle className="font-serif text-3xl font-light tracking-tight">Capability Matrix</CardTitle>
                <CardDescription className="text-muted-foreground/80 font-light text-lg">Map your current skill set to the future</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-10 space-y-8">
                <div className="space-y-4">
                  <Label className={labelClass}>Select Core Competencies</Label>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer px-4 py-2 text-sm transition-all duration-300",
                          selectedSkills.includes(skill)
                            ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.4)] border-primary"
                            : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground hover:border-white/30"
                        )}
                        onClick={() => handleSkillToggle(skill)}
                        data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals" className={labelClass}>Strategic Objectives (Optional)</Label>
                  <Textarea
                    id="goals"
                    placeholder="Tell us about your career or business goals..."
                    className="min-h-[120px] bg-white/5 border-white/10 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:border-primary/50 resize-none text-lg font-light placeholder:text-muted-foreground/30"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    data-testid="textarea-goals"
                  />
                </div>
                <div className="flex justify-between mt-8 pt-4 border-t border-white/5">
                  <Button variant="outline" onClick={() => setStep(2)} data-testid="button-back" className={outlineButtonClass}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(4)} data-testid="button-next-step" className={primaryButtonClass}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 4 && (
            <>
              <CardHeader className="p-8 md:p-10 pb-0 text-center">
                <CardTitle className="font-serif text-3xl font-light tracking-tight">System Optimized</CardTitle>
                <CardDescription className="text-muted-foreground/80 font-light text-lg">Your personalized foresight engine is ready</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-10 space-y-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-8 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="p-4 bg-primary rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      <svg className="h-8 w-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium mb-2">Analysis Complete</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We've processed your profile against 15M+ data points. Your dashboard has been configured with personalized West African market insights.
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-background/40 rounded-lg p-3 border border-white/5">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Skills</span>
                      <span className="font-mono text-primary">{selectedSkills.length} Mapped</span>
                    </div>
                    <div className="bg-background/40 rounded-lg p-3 border border-white/5">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Insights</span>
                      <span className="font-mono text-primary">Generated</span>
                    </div>
                    <div className="bg-background/40 rounded-lg p-3 border border-white/5">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Path</span>
                      <span className="font-mono text-primary">Ready</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-8 pt-4 border-t border-white/5">
                  <Button variant="outline" onClick={() => setStep(3)} data-testid="button-back" className={outlineButtonClass}>
                    Back
                  </Button>
                  <Button onClick={handleGetStarted} data-testid="button-get-started" className={primaryButtonClass} size="lg">
                    Launch Dashboard
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

