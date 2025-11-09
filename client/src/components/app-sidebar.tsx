import { LayoutDashboard, TrendingUp, BookOpen, MessageSquare, Settings, LogOut, Sparkles, Network, Target } from "lucide-react";
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
import logoUrl from "@assets/Future_Proofer_Logo-ig-square-1080-1080-removebg-preview_1762643734864.png";
import profileImageUrl from "@assets/generated_images/Alex_David_Pratt_profile_photo_f7c30d86.png";

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
    { title: "BusinessMate AI", url: "/businessmate", icon: MessageSquare },
    { title: "ThinkForge", url: "/thinkforge", icon: BookOpen },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  business: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Market Insights", url: "/insights", icon: TrendingUp },
    { title: "Growth Strategies", url: "/growth-strategies", icon: Target },
    { title: "Systems Thinking", url: "/systems-thinking", icon: Network },
    { title: "BusinessMate AI", url: "/businessmate", icon: MessageSquare },
    { title: "ThinkForge", url: "/thinkforge", icon: BookOpen },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

export function AppSidebar({ activeItem = "/dashboard", onNavigate, userMode = "career" }: AppSidebarProps) {
  const items = menuItems[userMode];

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Future Proofer" className="h-10 w-10" />
          <div>
            <h2 className="font-serif font-semibold text-lg text-sidebar-foreground">Future Proofer</h2>
            <p className="text-xs text-muted-foreground">AI-Powered Foresight</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="font-serif text-xs uppercase tracking-wider mb-2">
            {userMode === "career" ? "Career Mode" : "Business Mode"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeItem === item.url}
                    onClick={() => {
                      console.log(`Navigate to ${item.url}`);
                      onNavigate?.(item.url);
                    }}
                    data-testid={`link-sidebar-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center gap-3 cursor-pointer">
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </div>
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

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profileImageUrl} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">AP</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">Alex David Pratt</p>
            <p className="text-xs text-muted-foreground truncate">info@alexdavidpratt.co</p>
          </div>
          <button 
            className="p-2 hover-elevate active-elevate-2 rounded-md"
            onClick={() => console.log('Logout')}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
