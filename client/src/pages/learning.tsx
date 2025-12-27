import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Star, TrendingUp, Award } from "lucide-react";
import { ALEX_MASTERCLASSES } from "@/lib/mock-db";

export default function Learning() {
    const [, setLocation] = useLocation();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Featured Masterclass (using the first one)
    const featuredClass = ALEX_MASTERCLASSES[0];

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Hero Section */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredClass.thumbnail})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                </div>

                <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
                    <Badge className="w-fit mb-4 bg-primary/20 text-primary hover:bg-primary/30 border-primary/20 backdrop-blur-sm">
                        Featured Masterclass
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 max-w-3xl leading-tight">
                        {featuredClass.title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl line-clamp-2">
                        {featuredClass.description}
                    </p>
                    <div className="flex items-center gap-3">
                        <Button
                            size="default"
                            className="gap-2 px-6 py-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                            onClick={() => setLocation(`/learning/masterclass/${featuredClass.id}`)}
                        >
                            <Play className="fill-current h-4 w-4" /> Watch Now
                        </Button>
                        <Button
                            variant="outline"
                            size="default"
                            className="gap-2 px-6 py-2 backdrop-blur-sm bg-background/10 border-white/10 hover:bg-background/20"
                        >
                            <Star className="h-4 w-4" /> Add to List
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-serif font-bold">Popular Masterclasses</h2>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            All
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            Leadership
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            Strategy
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            Innovation
                        </Button>
                    </div>
                </div>

                <div className="flex overflow-x-auto snap-x no-scrollbar gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:pb-0">
                    {ALEX_MASTERCLASSES.map((course) => (
                        <div key={course.id} className="min-w-[85%] sm:min-w-[350px] snap-center md:min-w-0">
                            <Card
                                className="group relative overflow-hidden border-0 bg-card/50 hover:bg-card transition-colors duration-300 h-full flex flex-col"
                                onMouseEnter={() => setHoveredId(course.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Thumbnail */}
                                <div className="aspect-video relative overflow-hidden rounded-t-lg shrink-0">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                                    {/* Play Button Overlay */}
                                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredId === course.id ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                            <Play className="fill-white text-white h-5 w-5 ml-1" />
                                        </div>
                                    </div>

                                    <Badge className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border-0 text-white">
                                        {course.category}
                                    </Badge>
                                    <Badge variant="secondary" className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md border-0 text-white gap-1">
                                        <Clock className="h-3 w-3" /> {course.duration}
                                    </Badge>
                                </div>

                                <CardContent className="p-4 md:p-5 flex-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Award className="h-4 w-4 text-primary" />
                                        <span className="font-medium text-primary">{course.instructor}</span>
                                        <span className="hidden md:inline">•</span>
                                        <span className="hidden md:inline">{course.role}</span>
                                    </div>
                                    <h3 className="font-serif font-bold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 hidden md:block">
                                        {course.description}
                                    </p>
                                </CardContent>

                                <CardFooter className="p-4 md:p-5 pt-0 mt-auto">
                                    <Button
                                        className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                                        variant="secondary"
                                        onClick={() => setLocation(`/learning/masterclass/${course.id}`)}
                                    >
                                        <Play className="h-4 w-4 fill-current" /> Watch <span className="hidden md:inline">Masterclass</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
