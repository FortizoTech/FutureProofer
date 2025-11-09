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

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"career" | "business">();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

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

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <img src={logoUrl} alt="Future Proofer" className="h-16 w-16 mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold mb-2">Welcome to Future Proofer</h1>
          <p className="text-muted-foreground">Let's set up your personalized AI foresight experience</p>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">Step {step} of 4</p>
        </div>

        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="font-serif">Choose Your Focus</CardTitle>
                <CardDescription>Select how you want to use Future Proofer</CardDescription>
              </CardHeader>
              <CardContent>
                <ModeSelector selected={mode} onSelect={setMode} />
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!mode}
                    data-testid="button-next-step"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="font-serif">Tell Us About Yourself</CardTitle>
                <CardDescription>Help us personalize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" placeholder="John Doe" data-testid="input-fullname" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" data-testid="input-email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Sierra Leone" data-testid="input-location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" placeholder="Technology" data-testid="input-industry" />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep(1)} data-testid="button-back">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} data-testid="button-next-step">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="font-serif">Your Skills & Interests</CardTitle>
                <CardDescription>Select your current skills or areas of interest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2 text-sm hover-elevate active-elevate-2"
                      onClick={() => handleSkillToggle(skill)}
                      data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">Your Goals (Optional)</Label>
                  <Textarea
                    id="goals"
                    placeholder="Tell us about your career or business goals..."
                    className="min-h-[100px]"
                    data-testid="textarea-goals"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)} data-testid="button-back">
                    Back
                  </Button>
                  <Button onClick={() => setStep(4)} data-testid="button-next-step">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle className="font-serif">All Set!</CardTitle>
                <CardDescription>Your personalized dashboard is ready</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary rounded-lg">
                      <svg className="h-6 w-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Your AI Profile is Ready</h3>
                      <p className="text-sm text-muted-foreground">
                        We've analyzed your profile and prepared personalized insights based on West African market trends.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{selectedSkills.length} skills identified for growth tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>15+ AI-generated insights ready for you</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>Personalized learning path created</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)} data-testid="button-back">
                    Back
                  </Button>
                  <Button onClick={() => console.log('Navigate to dashboard')} data-testid="button-get-started">
                    Get Started
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
