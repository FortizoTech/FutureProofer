import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Briefcase, UserPlus, MessageSquare, Upload, Camera } from "lucide-react";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import profileImageUrl from "@assets/generated_images/Alex_David_Pratt_profile_photo_f7c30d86.png";
import { MENTORS_DATA, PEERS_DATA } from "@/lib/mock-db";

export default function Connect() {
    const { user, updateUser } = useUser();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("mentors");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, this would upload to a server
            // For now, we'll create a local URL
            const imageUrl = URL.createObjectURL(file);
            updateUser({ ...user, profileImageUrl: imageUrl });
            toast({
                title: "Profile Updated",
                description: "Your profile picture has been updated successfully.",
            });
        }
    };

    const mentors = user.selectedCareer
        ? MENTORS_DATA.filter(mentor => mentor.expertise.includes(user.selectedCareer!))
        : MENTORS_DATA;

    // Filter peers based on career path, or show all if no career selected
    const peers = user.selectedCareer
        ? PEERS_DATA.filter(peer => peer.career === user.selectedCareer || peer.career === "General Business")
        : PEERS_DATA;

    const handleConnect = (name: string, type: 'mentor' | 'peer') => {
        toast({
            title: type === 'mentor' ? "Mentorship Request Sent" : "Connection Request Sent",
            description: `You've sent a ${type === 'mentor' ? 'mentorship' : 'connection'} request to ${name}.`,
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-page-title">Connect</h1>
                <p className="text-muted-foreground">Build your professional network with mentors and peers</p>
            </div>

            {/* Profile Section */}
            <Card className="bg-gradient-to-r from-primary/5 to-transparent border-primary/10">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                                <AvatarImage src={user.profileImageUrl || profileImageUrl} />
                                <AvatarFallback>{user.fullName?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <label
                                htmlFor="profile-upload"
                                className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-md"
                            >
                                <Camera className="h-4 w-4" />
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-2xl font-bold font-serif">{user.fullName || "User Name"}</h2>
                            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                                <Briefcase className="h-4 w-4" />
                                {user.selectedCareer || "Career Path Not Set"}
                            </p>
                            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                                <MapPin className="h-4 w-4" />
                                {user.location || "Location Not Set"}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">Edit Profile</Button>
                            <Button>Share Profile</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Network Tabs */}
            <Tabs defaultValue="mentors" className="w-full" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-6">
                    <TabsList>
                        <TabsTrigger value="mentors" className="px-6">Find Mentors</TabsTrigger>
                        <TabsTrigger value="peers" className="px-6">Discover Peers</TabsTrigger>
                        <TabsTrigger value="requests">Requests</TabsTrigger>
                    </TabsList>
                    <div className="relative w-64 hidden md:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search people..." className="pl-10" />
                    </div>
                </div>

                <TabsContent value="mentors" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentors.map((mentor) => (
                            <Card key={mentor.id} className="hover-elevate transition-all">
                                <CardHeader className="text-center pb-2">
                                    <Avatar className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-4">
                                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                                    <CardDescription>{mentor.role} at {mentor.company}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center space-y-4">
                                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        {mentor.location}
                                    </div>
                                    <p className="text-sm line-clamp-2">{mentor.bio}</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {mentor.expertise.map((skill) => (
                                            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                                        ))}
                                    </div>
                                    <div className="pt-2">
                                        <Button className="w-full" onClick={() => handleConnect(mentor.name, 'mentor')}>
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Request Mentorship
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="peers" className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {peers.map((peer) => (
                            <Card key={peer.id} className="hover-elevate transition-all flex flex-col">
                                <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 pb-2 p-4 md:p-6">
                                    <Avatar className="h-10 w-10 md:h-12 md:w-12">
                                        <AvatarFallback>{peer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-center md:text-left">
                                        <CardTitle className="text-sm md:text-base font-bold leading-tight mb-1">{peer.name}</CardTitle>
                                        <CardDescription className="text-xs md:text-sm line-clamp-1">{peer.role}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2 md:space-y-4 p-4 md:p-6 pt-0 flex-1 flex flex-col">
                                    <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground justify-center md:justify-start">
                                        <MapPin className="h-3 w-3" />
                                        <span className="truncate">{peer.location}</span>
                                    </div>
                                    <div className="hidden md:flex flex-wrap gap-2">
                                        {peer.interests.map((interest) => (
                                            <Badge key={interest} variant="outline" className="text-xs">{interest}</Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 pt-2 mt-auto">
                                        <Button variant="outline" className="flex-1 h-8 md:h-10 text-xs md:text-sm px-2" onClick={() => handleConnect(peer.name, 'peer')}>
                                            <UserPlus className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                                            <span className="hidden md:inline">Connect</span>
                                            <span className="md:hidden">Add</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                                            <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
