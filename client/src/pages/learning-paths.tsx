import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Award, Clock, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { CourseCard } from "@/components/course-card";

export default function LearningPaths() {
  const activePath = {
    title: "Data Science Mastery Track",
    description: "Complete learning journey from beginner to advanced data scientist",
    totalCourses: 8,
    completedCourses: 3,
    estimatedTime: "6 months",
    skillsGained: ["Python", "Statistics", "Machine Learning", "Data Visualization", "Deep Learning"],
    level: "Beginner to Advanced",
  };

  const pathCourses = [
    {
      title: "Python Fundamentals",
      duration: "4 weeks",
      difficulty: "beginner" as const,
      category: "Programming",
      completed: true,
      progress: 100,
    },
    {
      title: "Data Analysis with Pandas",
      duration: "3 weeks",
      difficulty: "beginner" as const,
      category: "Data Science",
      completed: true,
      progress: 100,
    },
    {
      title: "Statistics for Data Science",
      duration: "4 weeks",
      difficulty: "intermediate" as const,
      category: "Mathematics",
      completed: true,
      progress: 100,
    },
    {
      title: "Machine Learning Basics",
      duration: "6 weeks",
      difficulty: "intermediate" as const,
      category: "Data Science",
      completed: false,
      progress: 45,
      current: true,
    },
    {
      title: "Deep Learning Fundamentals",
      duration: "8 weeks",
      difficulty: "advanced" as const,
      category: "AI",
      completed: false,
      progress: 0,
      locked: false,
    },
    {
      title: "Natural Language Processing",
      duration: "6 weeks",
      difficulty: "advanced" as const,
      category: "AI",
      completed: false,
      progress: 0,
      locked: true,
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="font-semibold">{activePath.totalCourses}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-md">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="font-semibold">{activePath.completedCourses}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-md">
                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Est. Time</p>
                <p className="font-semibold">{activePath.estimatedTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-md">
                <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
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
        <div className="space-y-4">
          {pathCourses.map((course, idx) => (
            <Card
              key={idx}
              className={`${
                course.current ? "border-primary/50 bg-primary/5" : ""
              } ${course.locked ? "opacity-60" : ""}`}
              data-testid={`card-path-course-${idx}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg shrink-0 ${
                    course.completed ? "bg-green-500/10" :
                    course.current ? "bg-primary/10" :
                    course.locked ? "bg-muted" :
                    "bg-muted"
                  }`}>
                    {course.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    ) : course.locked ? (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <div className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-primary text-primary font-semibold">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif font-semibold text-lg">{course.title}</h3>
                      {course.current && <Badge>In Progress</Badge>}
                      {course.completed && <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">Completed</Badge>}
                      {course.locked && <Badge variant="outline">Locked</Badge>}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span className="capitalize">{course.difficulty}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{course.category}</Badge>
                    </div>

                    {!course.completed && !course.locked && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    {course.locked && (
                      <p className="text-sm text-muted-foreground mb-4">
                        Complete previous courses to unlock this module
                      </p>
                    )}
                  </div>

                  <div className="shrink-0">
                    {course.completed ? (
                      <Button variant="outline" size="sm" data-testid="button-review-course">
                        Review
                      </Button>
                    ) : course.current ? (
                      <Button size="sm" data-testid="button-continue-course">
                        Continue
                      </Button>
                    ) : course.locked ? (
                      <Button variant="outline" size="sm" disabled data-testid="button-locked-course">
                        Locked
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" data-testid="button-start-course">
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
            <h2 className="font-serif text-2xl font-semibold">Recommended Learning Paths</h2>
            <p className="text-muted-foreground text-sm">Based on your interests and career goals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedPaths.map((path, idx) => (
            <Card key={idx} className="hover-elevate active-elevate-2 transition-all" data-testid={`card-recommended-path-${idx}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="font-serif text-lg">{path.title}</CardTitle>
                  {path.popular && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent-foreground shrink-0">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardDescription>{path.description}</CardDescription>
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
          ))}
        </div>
      </div>
    </div>
  );
}
