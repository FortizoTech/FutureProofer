import { CourseCard } from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Award, Users, TrendingUp, Filter, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ThinkForge() {
  const stats = [
    { icon: BookOpen, label: "Courses", value: "150+" },
    { icon: Users, label: "Students", value: "10,000+" },
    { icon: Award, label: "Certificates", value: "5,000+" },
    { icon: TrendingUp, label: "Success Rate", value: "92%" },
  ];

  const categories = [
    "Data Science",
    "Business",
    "Technology",
    "Marketing",
    "Finance",
    "Leadership",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold" data-testid="text-page-title">ThinkForge Academy</h1>
            <p className="text-muted-foreground">Master new skills with expert-led courses tailored for African markets</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-2xl font-bold font-serif">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Learning Path */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="font-serif">Your AI-Powered Learning Path</CardTitle>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Personalized
                </Badge>
              </div>
              <CardDescription>Based on your career goals and current skills</CardDescription>
            </div>
            <Button size="sm" data-testid="button-customize-path">Customize Path</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Data Science Mastery Track</span>
              <span className="text-sm text-muted-foreground">3 of 8 courses completed</span>
            </div>
            <Progress value={37.5} className="h-2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["Python Fundamentals", "Data Analysis", "Machine Learning"].map((course, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground line-through">{course}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["Deep Learning", "NLP Basics", "AI Ethics"].map((course, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                  <span className="text-muted-foreground">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, topics, instructors..."
            className="pl-10"
            data-testid="input-search-courses"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]" data-testid="select-category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]" data-testid="select-level">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="cursor-pointer hover-elevate active-elevate-2 whitespace-nowrap px-4 py-2"
            onClick={() => console.log(`Filter by ${category}`)}
            data-testid={`badge-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Courses Tabs */}
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommended" data-testid="tab-recommended">Recommended</TabsTrigger>
          <TabsTrigger value="enrolled" data-testid="tab-enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="popular" data-testid="tab-popular">Popular</TabsTrigger>
          <TabsTrigger value="new" data-testid="tab-new">New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              title="Introduction to Data Science"
              description="Learn the fundamentals of data analysis, statistics, and machine learning tailored for African markets."
              duration="6 weeks"
              difficulty="beginner"
              category="Data Science"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Python for AI Development"
              description="Master Python programming for artificial intelligence and deep learning applications."
              duration="8 weeks"
              difficulty="intermediate"
              category="Programming"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Business Analytics Fundamentals"
              description="Learn to analyze business data and make data-driven decisions for growth."
              duration="4 weeks"
              difficulty="beginner"
              category="Business"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Digital Marketing for African Markets"
              description="Master digital marketing strategies specifically designed for African consumer behavior."
              duration="5 weeks"
              difficulty="intermediate"
              category="Marketing"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Financial Modeling for SMEs"
              description="Build financial models for business planning, forecasting, and decision-making."
              duration="6 weeks"
              difficulty="intermediate"
              category="Finance"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Leadership in Tech"
              description="Develop leadership skills for managing technology teams and projects effectively."
              duration="4 weeks"
              difficulty="advanced"
              category="Leadership"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              title="Introduction to Data Science"
              description="Learn the fundamentals of data analysis, statistics, and machine learning."
              duration="6 weeks"
              difficulty="beginner"
              category="Data Science"
              thumbnail="placeholder"
              enrolled={true}
              progress={35}
              onAction={() => console.log('Continue course')}
            />
            <CourseCard
              title="Digital Marketing Strategy"
              description="Master digital marketing techniques for the African market."
              duration="5 weeks"
              difficulty="intermediate"
              category="Marketing"
              thumbnail="placeholder"
              enrolled={true}
              progress={68}
              onAction={() => console.log('Continue course')}
            />
            <CourseCard
              title="Python Programming Basics"
              description="Get started with Python programming from scratch."
              duration="4 weeks"
              difficulty="beginner"
              category="Programming"
              thumbnail="placeholder"
              enrolled={true}
              progress={100}
              onAction={() => console.log('Continue course')}
            />
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              title="Web Development Bootcamp"
              description="Complete full-stack web development from basics to deployment."
              duration="12 weeks"
              difficulty="beginner"
              category="Programming"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Advanced Machine Learning"
              description="Deep dive into advanced ML algorithms and neural networks."
              duration="10 weeks"
              difficulty="advanced"
              category="Data Science"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Entrepreneurship in Africa"
              description="Learn how to build and scale successful businesses in African markets."
              duration="6 weeks"
              difficulty="intermediate"
              category="Business"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              title="AI Ethics and Governance"
              description="Understand the ethical implications of AI and responsible development practices."
              duration="3 weeks"
              difficulty="intermediate"
              category="Technology"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Blockchain Fundamentals"
              description="Learn about blockchain technology and its applications in business."
              duration="5 weeks"
              difficulty="beginner"
              category="Technology"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Climate Tech Innovation"
              description="Explore technology solutions for climate change challenges in Africa."
              duration="4 weeks"
              difficulty="intermediate"
              category="Technology"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
