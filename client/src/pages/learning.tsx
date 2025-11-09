import { CourseCard } from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Learning() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-page-title">Learning Pathways</h1>
        <p className="text-muted-foreground">AI-recommended courses from ThinkForge masterclass library</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-serif font-semibold text-lg">Personalized Learning Path</h3>
                <Badge variant="secondary">AI Generated</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your skills and career goals, we've curated a learning path to help you master data science and AI.
              </p>
              <div className="flex gap-2">
                <Button size="sm" data-testid="button-start-path">Start Learning Path</Button>
                <Button size="sm" variant="outline" data-testid="button-customize">Customize</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          placeholder="Search courses..."
          className="pl-10"
          data-testid="input-search-courses"
        />
      </div>

      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommended" data-testid="tab-recommended">Recommended</TabsTrigger>
          <TabsTrigger value="enrolled" data-testid="tab-enrolled">Enrolled</TabsTrigger>
          <TabsTrigger value="all" data-testid="tab-all">All Courses</TabsTrigger>
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
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              title="Web Development Bootcamp"
              description="Complete full-stack web development from basics to deployment."
              duration="12 weeks"
              difficulty="beginner"
              category="Programming"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
            <CourseCard
              title="Financial Modeling"
              description="Learn to build financial models for business planning and analysis."
              duration="6 weeks"
              difficulty="intermediate"
              category="Finance"
              thumbnail="placeholder"
              onAction={() => console.log('Start course')}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
