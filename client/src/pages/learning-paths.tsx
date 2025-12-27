import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Award, Clock, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { useUser } from "@/context/user-context";
import Folder from "@/components/Folder";

import { COURSES_DATA } from "@/lib/mock-db";

export default function LearningPaths() {
  const { user } = useUser();
  const [activePathKey, setActivePathKey] = useState<string>(user.selectedCareer || "General Business");

  useEffect(() => {
    if (user.selectedCareer && COURSES_DATA[user.selectedCareer]) {
      setActivePathKey(user.selectedCareer);
    }
  }, [user.selectedCareer]);

  interface Course {
    id: number;
    title: string;
    progress: number;
    completed: boolean;
    current: boolean;
    locked: boolean;
    duration: string;
    difficulty: string;
    category: string;
  }

  interface PathData {
    title: string;
    description: string;
    totalCourses: number;
    completedCourses: number;
    estimatedTime: string;
    level: string;
    skills: string[];
    courses: Course[];
  }

  // Find all paths relevant to the user's skills
  const relevantPathKeys = Object.keys(COURSES_DATA).filter(key => {
    if (key === user.selectedCareer) return true;

    // Check if the path name itself is a selected skill
    if (user.selectedSkills?.includes(key)) return true;

    const pathData = COURSES_DATA[key];
    // Check for skill overlap
    return pathData.skills.some((skill: string) => user.selectedSkills?.includes(skill));
  });

  const availablePaths = Array.from(new Set([user.selectedCareer || "General Business", ...relevantPathKeys]))
    .filter(k => COURSES_DATA[k]);

  // Get path data based on active key
  const activePathData = (COURSES_DATA[activePathKey] || COURSES_DATA["General Business"]) as PathData;

  const activePath = {
    title: activePathData.title,
    description: activePathData.description,
    totalCourses: activePathData.totalCourses,
    completedCourses: activePathData.completedCourses,
    estimatedTime: activePathData.estimatedTime,
    skillsGained: activePathData.skills,
    level: activePathData.level,
  };

  const pathCourses = activePathData.courses;

  const recommendedPaths = [
    {
      title: "Full-Stack Web Development",
      description: "Build modern web applications from frontend to backend",
      courses: 10,
      duration: "8 months",
      level: "Beginner to Advanced",
      popular: true,
    },
    {
      title: "Business Analytics Professional",
      description: "Master data-driven decision making for business growth",
      courses: 6,
      duration: "4 months",
      level: "Intermediate",
      popular: false,
    },
    {
      title: "Digital Marketing Specialist",
      description: "Comprehensive digital marketing for African markets",
      courses: 7,
      duration: "5 months",
      level: "Beginner to Intermediate",
      popular: true,
    },
  ];

  const progressPercentage = (activePath.completedCourses / activePath.totalCourses) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-page-title">Learning Paths</h1>
        <p className="text-muted-foreground">Structured learning journeys designed to master in-demand skills</p>
      </div>

      {/* Path Selector using single Folder if multiple paths available */}
      {availablePaths.length > 1 && (
        <div className="w-full flex flex-col items-center">
          <h2 className="font-serif text-xl font-semibold mb-6 text-center">Your Learning Paths</h2>
          <Folder
            color="#5227FF"
            size={1.2}
            label="Click to explore your paths"
            items={availablePaths.map(key => {
              const pathData = COURSES_DATA[key];
              return {
                label: pathData.title,
                onClick: () => setActivePathKey(key)
              };
            })}
            className="mb-4"
          />
          <p className="text-sm text-muted-foreground text-center mt-4">
            Currently viewing: <span className="font-semibold text-primary">{COURSES_DATA[activePathKey]?.title}</span>
          </p>
        </div>
      )}

      {/* Active Path Overview */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="font-serif text-2xl">{activePath.title}</CardTitle>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Personalized
                </Badge>
              </div>
              <CardDescription className="text-base">{activePath.description}</CardDescription>
            </div>
            <Button variant="outline" data-testid="button-customize-path">Customize Path</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Total Courses</p>
                <p className="font-semibold">{activePath.totalCourses}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-md">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Completed</p>
                <p className="font-semibold">{activePath.completedCourses}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-md">
                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Est. Time</p>
                <p className="font-semibold">{activePath.estimatedTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-md">
                <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Level</p>
                <p className="font-semibold text-sm">{activePath.level}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {activePath.completedCourses} of {activePath.totalCourses} courses
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% complete</p>
          </div>

          <div>
            <p className="font-medium mb-3">Skills You'll Gain</p>
            <div className="flex flex-wrap gap-2">
              {activePath.skillsGained.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Progression */}
      <div>
        <h2 className="font-serif text-2xl font-semibold mb-6">Your Learning Journey</h2>
        <div className="space-y-8 relative">
          {/* Connector Line */}
          <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-border -z-10 md:left-9" />

          {pathCourses.map((course, idx) => (
            <Card
              key={idx}
              className={`${course.current ? "border-primary/50 bg-primary/5" : ""
                } ${course.locked ? "opacity-60" : ""} relative`}
              data-testid={`card-path-course-${idx}`}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 rounded-lg shrink-0 z-10 ${course.completed ? "bg-green-500/10" :
                    course.current ? "bg-primary/10" :
                      course.locked ? "bg-muted" :
                        "bg-muted"
                    }`}>
                    {course.completed ? (
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
                    ) : course.locked ? (
                      <Lock className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
                    ) : (
                      <div className="h-5 w-5 md:h-6 md:w-6 flex items-center justify-center rounded-full border-2 border-primary text-primary font-semibold text-xs md:text-sm">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-2">
                      <h3 className="font-serif font-semibold text-base md:text-lg truncate">{course.title}</h3>
                      <div className="flex gap-2">
                        {course.current && <Badge className="text-[10px] px-1.5 h-5">In Progress</Badge>}
                        {course.completed && <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 text-[10px] px-1.5 h-5">Completed</Badge>}
                        {course.locked && <Badge variant="outline" className="text-[10px] px-1.5 h-5">Locked</Badge>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 hidden sm:flex">
                        <Target className="h-3 w-3" />
                        <span className="capitalize">{course.difficulty}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] h-5 px-1.5">{course.category}</Badge>
                    </div>

                    {!course.completed && !course.locked && (
                      <div className="space-y-1.5 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    )}

                    {course.locked && (
                      <p className="text-xs text-muted-foreground mb-3 hidden sm:block">
                        Complete previous courses to unlock this module
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 self-center">
                    {course.completed ? (
                      <Button variant="outline" size="sm" className="h-8 text-xs" data-testid="button-review-course">
                        Review
                      </Button>
                    ) : course.current ? (
                      <Button size="sm" className="h-8 text-xs" data-testid="button-continue-course">
                        Continue
                      </Button>
                    ) : course.locked ? (
                      <Button variant="outline" size="sm" className="h-8 text-xs" disabled data-testid="button-locked-course">
                        Locked
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="h-8 text-xs" data-testid="button-start-course">
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Paths */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold">Recommended Learning Paths</h2>
            <p className="text-muted-foreground text-sm">Based on your interests and career goals</p>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x no-scrollbar gap-4 pb-4 md:grid md:grid-cols-3 md:gap-6 md:pb-0">
          {recommendedPaths.map((path, idx) => (
            <div key={idx} className="min-w-[85%] sm:min-w-[350px] snap-center md:min-w-0">
              <Card className="hover-elevate active-elevate-2 transition-all h-full" data-testid={`card-recommended-path-${idx}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="font-serif text-lg">{path.title}</CardTitle>
                    {path.popular && (
                      <Badge variant="secondary" className="bg-accent/10 text-accent-foreground shrink-0">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">{path.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Courses</p>
                      <p className="font-semibold">{path.courses}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-semibold">{path.duration}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Level</p>
                    <Badge variant="outline">{path.level}</Badge>
                  </div>
                  <Button className="w-full" variant="outline" data-testid="button-view-path">
                    View Path Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
