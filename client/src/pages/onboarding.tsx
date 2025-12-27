import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useUser } from "@/context/user-context";
import { AnimatedBackground } from "@/components/animated-backgrounds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Briefcase, TrendingUp, ArrowLeft, Sparkles, MapPin, Building2 } from "lucide-react";
import logoUrl from "@assets/Future_Proofer_Logo-ig-square-1080-1080-removebg-preview_1762643734864.png";
import { cn } from "@/lib/utils";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { updateUser } = useUser();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"career" | "business">();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [locationInput, setLocationInput] = useState("");
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

    updateUser({
      fullName,
      location: locationInput,
      selectedCareer,
      selectedSkills,
      userType: mode || 'career',
      bio: goals,
    });

    setLocation('/dashboard');
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans text-foreground selection:bg-primary/30">
      {/* Background */}
      <AnimatedBackground step={step} className="opacity-60" />

      {/* Noise Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl min-h-[650px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl flex flex-col overflow-hidden m-4"
      >
        {/* Header */}
        <div className="p-8 md:px-12 md:py-8 flex items-center justify-between border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt="Logo" className="h-10 w-10 drop-shadow-md" />
            <div>
              <h1 className="font-serif text-2xl tracking-tight text-foreground/90">Future Proofer</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">AI Foresight Engine</p>
            </div>
          </div>
          {/* Progress Dots */}
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                layout
                className={cn(
                  "h-1.5 rounded-full transition-colors duration-500",
                  step === i
                    ? "w-8 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : step > i
                      ? "w-1.5 bg-primary/50"
                      : "w-1.5 bg-white/10"
                )}
              />
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 relative flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={step}>

            {/* Step 1: Focus Mode */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-3xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-foreground">Choose Your Path</h2>
                  <p className="text-lg text-muted-foreground font-light">Select the lens through which you want to view the future.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button
                    onClick={() => setMode("career")}
                    className={cn(
                      "group relative p-8 rounded-2xl border transition-all duration-300 text-left overflow-hidden",
                      mode === "career"
                        ? "bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-serif mb-2">Career Mode</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Personalized trajectory forecasts, skill gap analysis, and job market foresight.
                      </p>
                    </div>
                    {mode === "career" && (
                      <motion.div layoutId="check" className="absolute top-4 right-4">
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </button>

                  <button
                    onClick={() => setMode("business")}
                    className={cn(
                      "group relative p-8 rounded-2xl border transition-all duration-300 text-left overflow-hidden",
                      mode === "business"
                        ? "bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-serif mb-2">Business Mode</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Market trend analysis, competitive intelligence, and strategic growth opportunities.
                      </p>
                    </div>
                    {mode === "business" && (
                      <motion.div layoutId="check" className="absolute top-4 right-4">
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={2}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-2xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-light mb-4">Identity Calibration</h2>
                  <p className="text-lg text-muted-foreground font-light">Establish your baseline for accurate predictions.</p>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <Label htmlFor="fullname" className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Full Name</Label>
                      <Input
                        id="fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border-0 border-b border-white/20 bg-transparent rounded-none px-0 py-2 h-auto text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-white/10"
                        placeholder="e.g. Alex Chen"
                      />
                    </div>
                    <div className="group">
                      <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-0 border-b border-white/20 bg-transparent rounded-none px-0 py-2 h-auto text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-white/10"
                        placeholder="alex@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                      <Label htmlFor="location" className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Location</Label>
                      <div className="relative">
                        <Input
                          id="location"
                          value={locationInput}
                          onChange={(e) => setLocationInput(e.target.value)}
                          className="border-0 border-b border-white/20 bg-transparent rounded-none px-0 py-2 h-auto text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-white/10 pl-8"
                          placeholder="New York, NY"
                        />
                        <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      </div>
                    </div>
                    <div className="group relative">
                      <Label htmlFor="industry" className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Industry</Label>
                      <div className="relative">
                        <Input
                          id="industry"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="border-0 border-b border-white/20 bg-transparent rounded-none px-0 py-2 h-auto text-lg focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-white/10 pl-8"
                          placeholder="Technology"
                        />
                        <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Skills */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={3}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-3xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="font-serif text-4xl font-light mb-4">Capability Matrix</h2>
                  <p className="text-lg text-muted-foreground font-light">Map your current skill set to the future.</p>
                </div>

                <div className="space-y-10">
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Select Core Competencies</Label>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <motion.button
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSkillToggle(skill)}
                          className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm",
                            selectedSkills.includes(skill)
                              ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                              : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/30 hover:bg-white/10"
                          )}
                        >
                          {skill}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="goals" className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Strategic Objectives (Optional)</Label>
                    <Textarea
                      id="goals"
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      className="min-h-[120px] bg-white/5 border-white/10 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:border-primary/50 resize-none text-lg font-light placeholder:text-white/10"
                      placeholder="I want to transition into AI leadership within 2 years..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Completion */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={4}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-2xl mx-auto text-center"
              >
                <div className="mb-8 relative inline-block">
                  <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative h-24 w-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-2xl mx-auto"
                  >
                    <Sparkles className="h-10 w-10 text-white" />
                  </motion.div>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">System Optimized</h2>
                <p className="text-lg text-muted-foreground font-light mb-10 max-w-lg mx-auto leading-relaxed">
                  We've analyzed your profile against 15+ million data points. Your personalized foresight engine is ready to launch.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="h-1 w-8 bg-primary rounded-full mb-3" />
                    <p className="text-sm font-medium text-foreground">Skills Mapped</p>
                    <p className="text-xs text-muted-foreground">{selectedSkills.length} Core Competencies</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="h-1 w-8 bg-primary rounded-full mb-3" />
                    <p className="text-sm font-medium text-foreground">Market Data</p>
                    <p className="text-xs text-muted-foreground">Synced & Analyzed</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="h-1 w-8 bg-primary rounded-full mb-3" />
                    <p className="text-sm font-medium text-foreground">Learning Path</p>
                    <p className="text-xs text-muted-foreground">Generated</p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer / Navigation */}
        <div className="p-8 border-t border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-3xl">
          {step > 1 ? (
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-muted-foreground hover:text-foreground hover:bg-white/5 gap-2 pl-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <div /> // Spacer
          )}

          {step < 4 ? (
            <Button
              onClick={nextStep}
              disabled={step === 1 && !mode}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 px-8 py-6 rounded-full text-lg font-light tracking-wide transition-all hover:scale-105"
            >
              Continue <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleGetStarted}
              className="bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] px-10 py-6 rounded-full text-lg font-medium tracking-wide transition-all hover:scale-105"
            >
              Enter Dashboard
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
