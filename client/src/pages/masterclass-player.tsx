import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Volume2,
    Maximize,
    Share2,
    ThumbsUp,
    List,
    ChevronDown,
    ChevronUp,
    Clock,
    CheckCircle2,
    Lock
} from "lucide-react";
import { ALEX_MASTERCLASSES } from "@/lib/mock-db";
import { cn } from "@/lib/utils";

export default function MasterclassPlayer() {
    const [, params] = useRoute("/learning/masterclass/:id");
    const [, setLocation] = useLocation();
    const [activeChapter, setActiveChapter] = useState(0);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const courseId = params?.id;
    const course = ALEX_MASTERCLASSES.find(c => c.id === courseId);

    // Redirect if course not found
    if (!course) {
        setLocation("/learning");
        return null;
    }

    const currentChapter = course.chapters?.[activeChapter];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Mobile Header (Sticky) */}
            <div className="lg:hidden sticky top-0 z-50 bg-background border-b">
                <div className="aspect-video w-full bg-black relative">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${course.videoId}?start=${currentChapter?.startAt}&autoplay=1`}
                        title={course.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <div className="p-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-serif font-bold text-sm line-clamp-1">{course.title}</h2>
                        <p className="text-xs text-muted-foreground">{currentChapter?.title}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        {isMobileOpen ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </div>
            </div>

            <div className="flex-1 container mx-auto px-4 py-6 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Content (Left Column) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Desktop Player */}
                        <div className="hidden lg:block aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${course.videoId}?start=${currentChapter?.startAt}&autoplay=1`}
                                title={course.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Video Details */}
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <Badge className="mb-2">{course.category}</Badge>
                                    <h1 className="text-2xl md:text-3xl font-serif font-bold">{course.title}</h1>
                                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                                        <span className="font-medium text-foreground">{course.instructor}</span>
                                        <span>•</span>
                                        <span>{course.role}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon">
                                        <ThumbsUp className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="prose dark:prose-invert max-w-none">
                                <h3 className="font-serif font-bold text-lg">About this Masterclass</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {course.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Right Column) */}
                    <div className={cn(
                        "lg:col-span-4 lg:block",
                        isMobileOpen ? "block" : "hidden"
                    )}>
                        <div className="sticky top-8 space-y-6">
                            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                                <div className="p-4 border-b bg-muted/30">
                                    <h3 className="font-serif font-bold flex items-center gap-2">
                                        <List className="h-4 w-4" /> Course Curriculum
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {activeChapter + 1} of {course.chapters?.length} lessons completed
                                    </p>
                                </div>

                                <ScrollArea className="h-[400px] lg:h-[600px]">
                                    <div className="p-2 space-y-1">
                                        {course.chapters?.map((chapter, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveChapter(index)}
                                                className={cn(
                                                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                                                    activeChapter === index
                                                        ? "bg-primary/10 hover:bg-primary/15"
                                                        : "hover:bg-muted"
                                                )}
                                            >
                                                <div className={cn(
                                                    "mt-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-medium border",
                                                    activeChapter === index
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background border-muted-foreground/30 text-muted-foreground"
                                                )}>
                                                    {activeChapter > index ? <CheckCircle2 className="h-3 w-3" /> : index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={cn(
                                                        "text-sm font-medium",
                                                        activeChapter === index ? "text-primary" : "text-foreground"
                                                    )}>
                                                        {chapter.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">
                                                            {chapter.duration}
                                                        </Badge>
                                                        {activeChapter === index && (
                                                            <span className="text-[10px] text-primary font-medium animate-pulse">
                                                                Playing
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>

                            {/* Related Masterclasses (Sidebar Widget) */}
                            <div className="bg-card border rounded-xl p-4">
                                <h3 className="font-serif font-bold text-sm mb-4">You might also like</h3>
                                <div className="space-y-4">
                                    {ALEX_MASTERCLASSES.filter(c => c.id !== course.id).slice(0, 2).map(related => (
                                        <div
                                            key={related.id}
                                            className="group flex gap-3 cursor-pointer"
                                            onClick={() => setLocation(`/learning/masterclass/${related.id}`)}
                                        >
                                            <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
                                                <img src={related.thumbnail} alt={related.title} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                                    {related.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1">{related.instructor}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
