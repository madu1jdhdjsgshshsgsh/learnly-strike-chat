
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Video } from "@/utils/recommendationEngine";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  UploadCloud, 
  Calendar, 
  Edit, 
  BookOpen, 
  Clock,
  Award,
  DollarSign,
  Users,
  Video as VideoIcon,
  ThumbsUp,
  MessageSquare,
  Heart,
  Book
} from "lucide-react";

// Mock data
const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "teacher", // or "student"
  avatar: null,
  bio: "Professional educator with 10+ years of experience teaching Mathematics and Physics. Passionate about making complex topics accessible to all students.",
  joined: "Jan 2023",
  qualifications: ["Ph.D. in Physics", "M.Ed. in Education", "B.Sc. in Mathematics"],
  topics: ["Mathematics", "Physics", "Algebra", "Calculus"],
  statistics: {
    subscribers: 15420,
    totalViews: 427950,
    totalVideos: 72,
    earnings: 8750,
    liveSessionPrice: 25,
    averageRating: 4.8,
    completedTopics: 48,
    savedVideos: 36,
    performanceScore: 85,
    testsCompleted: 24
  },
  videos: [
    {
      id: "v1",
      title: "Introduction to Algebra",
      thumbnail: "/placeholder.svg",
      views: 24500,
      likes: 1840,
      comments: 320,
      date: "2023-05-15",
      duration: 1800
    },
    {
      id: "v2",
      title: "Calculus Fundamentals",
      thumbnail: "/placeholder.svg",
      views: 18300,
      likes: 1420,
      comments: 210,
      date: "2023-06-10",
      duration: 2400
    },
    {
      id: "v3",
      title: "Physics: Forces & Motion",
      thumbnail: "/placeholder.svg",
      views: 21700,
      likes: 1680,
      comments: 280,
      date: "2023-07-05",
      duration: 2100
    }
  ],
  watchHistory: [
    {
      id: "w1",
      title: "Advanced Python Programming",
      thumbnail: "/placeholder.svg",
      teacher: "Prof. Johnson",
      date: "2023-07-15",
      progress: 85
    },
    {
      id: "w2",
      title: "Data Structures & Algorithms",
      thumbnail: "/placeholder.svg",
      teacher: "Dr. Smith",
      date: "2023-07-12",
      progress: 100
    },
    {
      id: "w3",
      title: "Machine Learning Basics",
      thumbnail: "/placeholder.svg",
      teacher: "Ms. Williams",
      date: "2023-07-08",
      progress: 60
    }
  ],
  syllabusFiles: [
    {
      id: "s1",
      name: "Computer Science 101.pdf",
      uploadDate: "2023-06-20",
      size: "2.4 MB"
    },
    {
      id: "s2",
      name: "Data Science Fundamentals.pdf",
      uploadDate: "2023-07-01",
      size: "3.1 MB"
    }
  ],
  analytics: {
    viewsByTopic: [
      { topic: "Algebra", views: 87500 },
      { topic: "Calculus", views: 65300 },
      { topic: "Geometry", views: 42100 },
      { topic: "Physics", views: 78600 },
      { topic: "Chemistry", views: 31200 }
    ],
    monthlyViews: [
      { month: "Jan", views: 35000 },
      { month: "Feb", views: 42000 },
      { month: "Mar", views: 38000 },
      { month: "Apr", views: 45000 },
      { month: "May", views: 52000 },
      { month: "Jun", views: 58000 },
      { month: "Jul", views: 61000 }
    ]
  },
  studyPlan: {
    nextTopics: ["Data Visualization", "Neural Networks", "Natural Language Processing"],
    weeklyGoals: [
      { topic: "Python Programming", progress: 80 },
      { topic: "Machine Learning", progress: 45 },
      { topic: "Database Systems", progress: 60 }
    ],
    upcomingTests: [
      { title: "Python Certification", date: "2023-08-15", readiness: 75 },
      { title: "Data Science Exam", date: "2023-09-10", readiness: 45 }
    ]
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const TeacherProfile = ({ user }: { user: typeof mockUser }) => {
  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Overview of your content performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Subscribers</p>
                    <p className="text-2xl font-bold">{formatNumber(user.statistics.subscribers)}</p>
                  </div>
                  <Users className="h-8 w-8 text-strike-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">{formatNumber(user.statistics.totalViews)}</p>
                  </div>
                  <VideoIcon className="h-8 w-8 text-strike-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Videos</p>
                    <p className="text-2xl font-bold">{user.statistics.totalVideos}</p>
                  </div>
                  <VideoIcon className="h-8 w-8 text-strike-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Earnings</p>
                    <p className="text-2xl font-bold">${user.statistics.earnings}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-strike-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-4">Views by Topic</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={user.analytics.viewsByTopic}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={user.analytics.monthlyViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Videos */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Videos</CardTitle>
          <CardDescription>Manage your educational content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.videos.map(video => (
              <div key={video.id} className="flex flex-col md:flex-row gap-4 pb-4 border-b">
                <div className="w-full md:w-48 flex-shrink-0">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{video.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <VideoIcon className="w-4 h-4 mr-1" />
                      {formatNumber(video.views)} views
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {formatNumber(video.likes)}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {formatNumber(video.comments)}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(video.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Analytics
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button className="w-full bg-strike-500 hover:bg-strike-600">
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload New Video
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Live Sessions</CardTitle>
          <CardDescription>Manage your upcoming live classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Your session price</p>
              <p className="text-xl font-medium">${user.statistics.liveSessionPrice}/hour</p>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Update Price
            </Button>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You have no upcoming live sessions scheduled.</p>
            <Button className="bg-strike-500 hover:bg-strike-600">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Live Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StudentProfile = ({ user }: { user: typeof mockUser }) => {
  return (
    <div className="space-y-6">
      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Track your educational journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Topics</p>
                    <p className="text-2xl font-bold">{user.statistics.completedTopics}</p>
                  </div>
                  <Award className="h-8 w-8 text-strike-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tests Completed</p>
                    <p className="text-2xl font-bold">{user.statistics.testsCompleted}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-strike-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Performance Score</p>
                    <p className="text-2xl font-bold">{user.statistics.performanceScore}%</p>
                  </div>
                  <Award className="h-8 w-8 text-strike-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4 mb-6">
            <h3 className="font-medium">Weekly Goals</h3>
            {user.studyPlan.weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span>{goal.topic}</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Upcoming Tests</h3>
            <div className="space-y-4">
              {user.studyPlan.upcomingTests.map((test, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{test.title}</h4>
                      <Badge variant={test.readiness > 70 ? "default" : "outline"}>
                        {test.readiness > 70 ? "Ready" : "Preparing"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(test.date).toLocaleDateString()}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Readiness</span>
                        <span>{test.readiness}%</span>
                      </div>
                      <Progress value={test.readiness} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Watch History */}
      <Card>
        <CardHeader>
          <CardTitle>Learning History</CardTitle>
          <CardDescription>Recently watched educational content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.watchHistory.map(video => (
              <div key={video.id} className="flex flex-col md:flex-row gap-4 pb-4 border-b">
                <div className="w-full md:w-48 flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    {video.progress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <Progress value={video.progress} className="h-1 rounded-none" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.teacher}</p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    Watched on {new Date(video.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Syllabus & Study Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Study Materials</CardTitle>
          <CardDescription>Your syllabus and AI-generated study plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-medium mb-3">Uploaded Syllabus</h3>
            <div className="space-y-2">
              {user.syllabusFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-strike-500" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded on {new Date(file.uploadDate).toLocaleDateString()} • {file.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload New Syllabus
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">AI-Generated Study Plan</h3>
            <div className="bg-secondary p-4 rounded-md mb-4">
              <p className="text-sm font-medium mb-2">Recommended Topics to Focus On:</p>
              <div className="flex flex-wrap gap-2">
                {user.studyPlan.nextTopics.map((topic, index) => (
                  <Badge key={index} variant="outline">{topic}</Badge>
                ))}
              </div>
            </div>
            <Button className="w-full bg-strike-500 hover:bg-strike-600">
              Generate Detailed Study Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-strike-500 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Error loading profile data.</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback className="text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <Button variant="outline" className="mt-2 md:mt-0">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="mb-4">
                  <Badge className="mb-2">{user.role === "teacher" ? "Teacher" : "Student"}</Badge>
                  <p className="text-muted-foreground text-sm">Member since {user.joined}</p>
                </div>
                
                <p className="mb-4">{user.bio}</p>
                
                {user.qualifications && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Qualifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.qualifications.map((qual, index) => (
                        <Badge key={index} variant="outline">{qual}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {user.role === "teacher" ? (
              <TabsTrigger value="earnings">Earnings & Analytics</TabsTrigger>
            ) : (
              <TabsTrigger value="progress">Learning Progress</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="overview">
            {user.role === "teacher" ? (
              <TeacherProfile user={user} />
            ) : (
              <StudentProfile user={user} />
            )}
          </TabsContent>
          
          <TabsContent value="earnings">
            {user.role === "teacher" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Dashboard</CardTitle>
                    <CardDescription>Track your revenue and payment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Earnings</p>
                              <p className="text-2xl font-bold">${user.statistics.earnings}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-strike-500" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">This Month</p>
                              <p className="text-2xl font-bold">$1,250</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-strike-500" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Pending Payout</p>
                              <p className="text-2xl font-bold">$750</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-strike-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-4">Monthly Earnings</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={user.analytics.monthlyViews}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="views" name="Earnings ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <Button className="w-full bg-strike-500 hover:bg-strike-600">
                      Withdraw Earnings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="progress">
            {user.role === "student" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Analytics</CardTitle>
                    <CardDescription>Detailed insights into your learning journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">Subject Proficiency</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Mathematics</span>
                              <span>82%</span>
                            </div>
                            <Progress value={82} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Physics</span>
                              <span>68%</span>
                            </div>
                            <Progress value={68} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Programming</span>
                              <span>93%</span>
                            </div>
                            <Progress value={93} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-3">Learning Habits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Average Daily Study</p>
                                <p className="text-2xl font-bold">1.5 hours</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Consistency</p>
                                <p className="text-2xl font-bold">85%</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">Top Study Time</p>
                                <p className="text-2xl font-bold">Evenings</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
