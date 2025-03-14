
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Bell, User, Lock, Moon, Eye, Globe } from "lucide-react";

export const SettingsForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("your.email@example.com");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" /> Account
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notifications
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Eye className="h-4 w-4" /> Appearance
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-2">
          <Lock className="h-4 w-4" /> Privacy
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your account activity
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and offers
                </p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, marketing: checked })
                }
              />
            </div>
            <Button onClick={handleSave}>Save Preferences</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Button onClick={handleSave}>Save Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="privacy">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Control who can see your profile
                </p>
              </div>
              <select className="border rounded p-2">
                <option>Everyone</option>
                <option>Only Friends</option>
                <option>Private</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-retention">Data Retention</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Choose how long we keep your activity data
              </p>
              <select 
                id="data-retention"
                className="w-full border rounded p-2"
              >
                <option>3 months</option>
                <option>6 months</option>
                <option>1 year</option>
                <option>Forever</option>
              </select>
            </div>
            <Button onClick={handleSave}>Save Privacy Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
