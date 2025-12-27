import { LayoutDashboard, TrendingUp, BookOpen, MessageSquare, Settings, LogOut, Sparkles, Network, Target, Users, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/Future_Proofer_Logo-ig-square-1080-1080-removebg-preview_1762643734864.png";
import profileImageUrl from "@assets/generated_images/Alex_David_Pratt_profile_photo_f7c30d86.png";
import { useUser } from "@/context/user-context";
import { useState } from "react";

interface AppSidebarProps {
  activeItem?: string;
  onNavigate?: (path: string) => void;
  userMode?: "career" | "business";
}

const menuItems = {
  career: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Career Insights", url: "/insights", icon: TrendingUp },
    { title: "Learning Paths", url: "/learning-paths", icon: BookOpen },
    { title: "Masterclasses", url: "/learning", icon: Sparkles },
    { title: "Connect", url: "/connect", icon: Users },
    { title: "BusinessMate AI", url: "/businessmate", icon: MessageSquare },
    { title: "ThinkForge", url: "/thinkforge", icon: BookOpen },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  business: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Market Insights", url: "/insights", icon: TrendingUp },
    { title: "Growth Strategies", url: "/growth-strategies", icon: Target },
    { title: "Systems Thinking", url: "/systems-thinking", icon: Network },
    { title: "Masterclasses", url: "/learning", icon: Sparkles },
    { title: "Connect", url: "/connect", icon: Users },
    { title: "BusinessMate AI", url: "/businessmate", icon: MessageSquare },
    { title: "ThinkForge", url: "/thinkforge", icon: BookOpen },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

function SidebarContent_({ activeItem, onNavigate, userMode, onClose, collapsible }: AppSidebarProps & { onClose?: () => void, collapsible?: React.ComponentProps<typeof Sidebar>["collapsible"] }) {
  const { user } = useUser();
  const items = menuItems[userMode || "career"];
  const profileImage = user.profileImageUrl || profileImageUrl;

  const handleNavigation = (url: string) => {
    onNavigate?.(url);
    onClose?.();
  };

  return (
    <Sidebar collapsible={collapsible}>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Future Proofer" className="h-8 w-8" />
          <div className="flex-1">
            <h2 className="font-serif font-bold text-lg">Future Proofer</h2>
            <Badge variant="secondary" className="text-xs">
              {userMode === "career" ? "Career Mode" : "Business Mode"}
            </Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-serif text-xs uppercase tracking-wider mb-2">
            {userMode === "career" ? "Career Mode" : "Business Mode"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.url)}
                    isActive={activeItem === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="font-serif text-xs uppercase tracking-wider mb-2">
            Subscription
          </SidebarGroupLabel>
          <div className="px-3 py-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-md border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <Badge variant="secondary" className="text-xs">Free Plan</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Upgrade to Premium for advanced AI insights</p>
            <button
              className="w-full text-xs font-medium px-3 py-2 bg-primary text-primary-foreground rounded-md hover-elevate active-elevate-2"
              onClick={() => console.log('Navigate to upgrade')}
              data-testid="button-upgrade"
            >
              Upgrade Now
            </button>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profileImage} />
            <AvatarFallback>{user.fullName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.fullName || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user.location || "Add location"}</p>
          </div>
          <button
            className="p-2 hover-elevate active-elevate-2 rounded-md"
            onClick={() => {
              console.log('Logout');
              onNavigate?.('/login');
            }}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebar({ activeItem = "/dashboard", onNavigate, userMode = "career" }: AppSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-background">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SidebarContent_
              activeItem={activeItem}
              onNavigate={onNavigate}
              userMode={userMode}
              onClose={() => setOpen(false)}
              collapsible="none"
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarContent_ activeItem={activeItem} onNavigate={onNavigate} userMode={userMode} />
      </div>
    </>
  );
}
