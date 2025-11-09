import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ModeSelector } from "@/components/mode-selector";
import { SubscriptionPlans } from "@/components/subscription-plans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { UpgradeModal } from "@/components/upgrade-modal";
import profileImageUrl from "@assets/generated_images/Alex_David_Pratt_profile_photo_f7c30d86.png";

export default function Settings() {
  const [mode, setMode] = useState<"career" | "business">("career");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-page-title">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
          <TabsTrigger value="mode" data-testid="tab-mode">Mode</TabsTrigger>
          <TabsTrigger value="subscription" data-testid="tab-subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImageUrl} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">AP</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" data-testid="button-change-photo">Change Photo</Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" defaultValue="Alex David Pratt" data-testid="input-fullname" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="info@alexdavidpratt.co" data-testid="input-email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+220 7330 540" data-testid="input-phone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Sierra Leone" data-testid="input-location" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" data-testid="button-cancel">Cancel</Button>
                <Button data-testid="button-save-profile">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mode" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Focus Mode</CardTitle>
              <CardDescription>Choose how you want to use Future Proofer</CardDescription>
            </CardHeader>
            <CardContent>
              <ModeSelector selected={mode} onSelect={setMode} />
              <div className="flex justify-end mt-6">
                <Button data-testid="button-save-mode">Save Mode Selection</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Subscription Management</CardTitle>
              <CardDescription>Upgrade or manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionPlans userType="individual" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive insights and updates via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  data-testid="switch-email-notifications"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="ai-recommendations" className="text-base">AI Recommendations</Label>
                  <p className="text-sm text-muted-foreground">Get personalized AI-powered insights</p>
                </div>
                <Switch
                  id="ai-recommendations"
                  checked={aiRecommendations}
                  onCheckedChange={setAiRecommendations}
                  data-testid="switch-ai-recommendations"
                />
              </div>

              <div className="flex justify-end">
                <Button data-testid="button-save-notifications">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
    </div>
  );
}
