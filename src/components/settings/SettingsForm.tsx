
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  User, 
  Lock, 
  CreditCard, 
  Eye, 
  Globe, 
  Calendar, 
  BadgeCheck, 
  BookOpen, 
  Target,
  Award,
  PencilRuler,
  Video,
  DollarSign
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsFormProps {
  userRole: "student" | "teacher";
}

export const SettingsForm = ({ userRole }: SettingsFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("your.email@example.com");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
  });
  const [darkMode, setDarkMode] = useState(false);
  
  // New states for enhanced functionality
  const [privacySettings, setPrivacySettings] = useState({
    showActivity: true,
    hideHistory: false,
    publicProfile: true,
  });
  
  const [subscriptionPlan, setSubscriptionPlan] = useState("free");
  const [aiCredits, setAiCredits] = useState(100);
  
  // Teacher-specific states
  const [teacherSettings, setTeacherSettings] = useState({
    paymentSetup: false,
    autoWithdrawal: false,
    suggestContent: true,
    liveSessionEnabled: true,
  });
  
  // Student-specific states
  const [studentSettings, setStudentSettings] = useState({
    aiRecommendations: true,
    examPreferences: "all",
    goalReminders: true,
  });

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-6 flex flex-wrap">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" /> Account
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notifications
        </TabsTrigger>
        <TabsTrigger value="subscription" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Subscription
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-2">
          <Lock className="h-4 w-4" /> Privacy
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Eye className="h-4 w-4" /> Appearance
        </TabsTrigger>
        {userRole === "teacher" && (
          <TabsTrigger value="teacher" className="flex items-center gap-2">
            <Award className="h-4 w-4" /> Teacher Settings
          </TabsTrigger>
        )}
        {userRole === "student" && (
          <TabsTrigger value="student" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Student Settings
          </TabsTrigger>
        )}
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value="••••••••"
                onChange={() => {}}
              />
              <Button variant="link" className="px-0">Change password</Button>
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
            {userRole === "student" && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Learning Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Get reminders to continue your learning journey
                  </p>
                </div>
                <Switch
                  checked={studentSettings.goalReminders}
                  onCheckedChange={(checked) =>
                    setStudentSettings({ ...studentSettings, goalReminders: checked })
                  }
                />
              </div>
            )}
            {userRole === "teacher" && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Engagement Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when students engage with your content
                  </p>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
            )}
            <Button onClick={handleSave}>Save Preferences</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="subscription">
        <Card>
          <CardHeader>
            <CardTitle>Subscription & AI Credits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="flex items-center justify-between mt-2 p-4 border rounded-md bg-muted/50">
                  <div>
                    <p className="font-medium capitalize">{subscriptionPlan === "free" ? "Free Plan" : "Premium Plan"}</p>
                    <p className="text-sm text-muted-foreground">
                      {subscriptionPlan === "free" 
                        ? "Basic features with limited AI usage" 
                        : "Full access to all features and AI tools"}
                    </p>
                  </div>
                  {subscriptionPlan === "free" ? (
                    <Button variant="default">Upgrade</Button>
                  ) : (
                    <Button variant="outline">Manage</Button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">AI Credits</h3>
                <div className="mt-2 p-4 border rounded-md bg-muted/50">
                  <div className="flex items-center justify-between">
                    <p><span className="font-bold text-xl">{aiCredits}</span> credits remaining</p>
                    <Button variant="outline">Buy Credits</Button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(aiCredits/200) * 100}%` }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Credits are used for AI-powered features like personalized recommendations and test generation
                  </p>
                </div>
              </div>

              {userRole === "teacher" && (
                <div>
                  <h3 className="text-lg font-medium">Creator Benefits</h3>
                  <div className="mt-2 p-4 border rounded-md bg-muted/50">
                    <p className="font-medium">Creator Revenue Share: 70%</p>
                    <p className="text-sm text-muted-foreground">
                      You earn 70% of all revenue generated from your content
                    </p>
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleSave}>Save Preferences</Button>
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
              <Select defaultValue="everyone">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="followers">Only Followers</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Activity</p>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your learning activity
                </p>
              </div>
              <Switch
                checked={privacySettings.showActivity}
                onCheckedChange={(checked) =>
                  setPrivacySettings({ ...privacySettings, showActivity: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Hide Learning History</p>
                <p className="text-sm text-muted-foreground">
                  Hide your learning history from recommendations
                </p>
              </div>
              <Switch
                checked={privacySettings.hideHistory}
                onCheckedChange={(checked) =>
                  setPrivacySettings({ ...privacySettings, hideHistory: checked })
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="data-retention">Data Retention</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Choose how long we keep your activity data
              </p>
              <Select defaultValue="1year">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 months</SelectItem>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleSave}>Save Privacy Settings</Button>
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
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">High Contrast</p>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better readability
                </p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave}>Save Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      {userRole === "teacher" && (
        <TabsContent value="teacher">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Payment & Earnings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Setup</p>
                      <p className="text-sm text-muted-foreground">
                        Complete your payment details to receive earnings
                      </p>
                    </div>
                    <Button 
                      variant={teacherSettings.paymentSetup ? "outline" : "default"}
                      onClick={() => setTeacherSettings({...teacherSettings, paymentSetup: true})}
                    >
                      {teacherSettings.paymentSetup ? "Update" : "Set Up"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automatic Withdrawals</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically withdraw earnings when they reach a threshold
                      </p>
                    </div>
                    <Switch
                      checked={teacherSettings.autoWithdrawal}
                      onCheckedChange={(checked) =>
                        setTeacherSettings({ ...teacherSettings, autoWithdrawal: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Live Sessions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Live Sessions</p>
                      <p className="text-sm text-muted-foreground">
                        Let students book live teaching sessions with you
                      </p>
                    </div>
                    <Switch
                      checked={teacherSettings.liveSessionEnabled}
                      onCheckedChange={(checked) =>
                        setTeacherSettings({ ...teacherSettings, liveSessionEnabled: checked })
                      }
                    />
                  </div>
                  
                  {teacherSettings.liveSessionEnabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="session-rate">Hourly Rate (USD)</Label>
                        <Input 
                          id="session-rate"
                          type="number" 
                          placeholder="40" 
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Button variant="outline" className="w-full justify-start">
                          <Calendar className="mr-2 h-4 w-4" />
                          Set Schedule
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Content Recommendations</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">AI Content Suggestions</p>
                    <p className="text-sm text-muted-foreground">
                      Receive AI-generated suggestions for new videos based on student needs
                    </p>
                  </div>
                  <Switch
                    checked={teacherSettings.suggestContent}
                    onCheckedChange={(checked) =>
                      setTeacherSettings({ ...teacherSettings, suggestContent: checked })
                    }
                  />
                </div>
              </div>
              
              <Button onClick={handleSave}>Save Teacher Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      )}

      {userRole === "student" && (
        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Student Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Learning Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">AI Recommendations</p>
                      <p className="text-sm text-muted-foreground">
                        Allow AI to suggest personalized learning content
                      </p>
                    </div>
                    <Switch
                      checked={studentSettings.aiRecommendations}
                      onCheckedChange={(checked) =>
                        setStudentSettings({ ...studentSettings, aiRecommendations: checked })
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="exam-preference">Exam Preferences</Label>
                    <Select 
                      defaultValue={studentSettings.examPreferences}
                      onValueChange={(value) => 
                        setStudentSettings({...studentSettings, examPreferences: value})
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Exams</SelectItem>
                        <SelectItem value="semester">Semester Exams</SelectItem>
                        <SelectItem value="national">National Level Exams</SelectItem>
                        <SelectItem value="competitive">Competitive Exams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Goals & Progress</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="learning-goal">Learning Goal</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily (30 minutes)</SelectItem>
                        <SelectItem value="weekly">Weekly (3 hours)</SelectItem>
                        <SelectItem value="monthly">Monthly (15 hours)</SelectItem>
                        <SelectItem value="custom">Custom Goal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Goal Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Get reminders to help you meet your learning goals
                      </p>
                    </div>
                    <Switch
                      checked={studentSettings.goalReminders}
                      onCheckedChange={(checked) =>
                        setStudentSettings({ ...studentSettings, goalReminders: checked })
                      }
                    />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSave}>Save Student Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
};
