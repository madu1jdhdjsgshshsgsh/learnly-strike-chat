
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Video, 
  Users, 
  BarChart, 
  History, 
  Download, 
  Clock, 
  FileText,
  Award,
  BookMarked,
  Calendar,
  DollarSign
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { allVideos } from "@/utils/recommendationEngine";
import VideoCard from "@/components/home/VideoCard";

// Mock data for the charts
const viewsData = [
  { name: "Jan", views: 1500 },
  { name: "Feb", views: 2500 },
  { name: "Mar", views: 4000 },
  { name: "Apr", views: 3800 },
  { name: "May", views: 5000 },
  { name: "Jun", views: 6000 },
];

const earningsData = [
  { name: "Jan", earnings: 120 },
  { name: "Feb", earnings: 180 },
  { name: "Mar", earnings: 220 },
  { name: "Apr", earnings: 250 },
  { name: "May", earnings: 300 },
  { name: "Jun", earnings: 350 },
];

const progressData = [
  { subject: "Math", completed: 65, total: 100 },
  { subject: "Science", completed: 80, total: 100 },
  { subject: "History", completed: 45, total: 100 },
  { subject: "Programming", completed: 90, total: 100 },
];

// Mock schedule data
const scheduleData = [
  { date: "2023-10-15", time: "10:00 AM", title: "Advanced Calculus", students: 15, duration: "60 min", price: "$25" },
  { date: "2023-10-17", time: "2:00 PM", title: "JavaScript Basics", students: 20, duration: "90 min", price: "$30" },
  { date: "2023-10-20", time: "11:00 AM", title: "Chemistry Lab", students: 12, duration: "60 min", price: "$25" },
];

// Mock test performance data
const testData = [
  { test: "Calculus Mid-term", score: 85, date: "2023-09-10", percentile: 75 },
  { test: "JavaScript Fundamentals", score: 92, date: "2023-09-15", percentile: 88 },
  { test: "Chemistry Basics", score: 78, date: "2023-09-20", percentile: 65 },
  { test: "History Essay", score: 88, date: "2023-09-25", percentile: 82 },
];

const Profile = () => {
  // For demo purposes, we're setting a role. In a real app, this would come from auth
  const [userRole, setUserRole] = useState<"student" | "teacher">("teacher");
  const [uploadedVideos, setUploadedVideos] = useState(allVideos.slice(0, 4));
  const [savedVideos, setSavedVideos] = useState(allVideos.slice(4, 8));
  
  // Toggle between teacher and student role for demonstration
  const toggleRole = () => {
    setUserRole(userRole === "teacher" ? "student" : "teacher");
  };
  
  return (
    <Layout>
      <div className="container py-8 mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
              <AvatarImage src={userRole === "teacher" ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" : "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200"} />
              <AvatarFallback className="text-2xl">
                {userRole === "teacher" ? "TT" : "ST"}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {userRole === "teacher" ? "Dr. Alice Johnson" : "Sam Thompson"}
                </h1>
                <p className="text-muted-foreground">
                  {userRole === "teacher" ? "Mathematics Professor" : "Computer Science Student"}
                </p>
              </div>
              
              <div className="flex gap-3">
                {userRole === "teacher" ? (
                  <>
                    <Button size="sm" className="gap-1">
                      <Video className="h-4 w-4" />
                      Upload Video
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      Schedule Session
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Upload Syllabus
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <BookMarked className="h-4 w-4" />
                      Study Plan
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-6">
              {userRole === "teacher" ? (
                <>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-strike-500" />
                    <span className="font-medium">15.2K Subscribers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-strike-500" />
                    <span className="font-medium">48 Videos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-strike-500" />
                    <span className="font-medium">2.5M Total Views</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-strike-500" />
                    <span className="font-medium">4 Subjects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-strike-500" />
                    <span className="font-medium">156 Hours Learned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-strike-500" />
                    <span className="font-medium">85% Average Score</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* For demo purposes only - toggle between teacher/student */}
        <div className="mb-6 flex justify-end">
          <Button variant="outline" onClick={toggleRole}>
            Switch to {userRole === "teacher" ? "Student" : "Teacher"} View (Demo)
          </Button>
        </div>
        
        {/* Role-specific Content */}
        {userRole === "teacher" ? (
          <TeacherProfileContent 
            uploadedVideos={uploadedVideos} 
            viewsData={viewsData} 
            earningsData={earningsData}
            scheduleData={scheduleData}
          />
        ) : (
          <StudentProfileContent 
            savedVideos={savedVideos} 
            progressData={progressData} 
            testData={testData}
          />
        )}
      </div>
    </Layout>
  );
};

// Teacher-specific content component
const TeacherProfileContent = ({ 
  uploadedVideos, 
  viewsData, 
  earningsData,
  scheduleData
}: { 
  uploadedVideos: any[], 
  viewsData: any[], 
  earningsData: any[],
  scheduleData: any[]
}) => {
  return (
    <Tabs defaultValue="videos" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="videos">My Videos</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="earnings">Earnings</TabsTrigger>
        <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="videos" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Videos</CardTitle>
            <CardDescription>Manage your educational content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {uploadedVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline">View All Videos</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Video Performance</CardTitle>
            <CardDescription>View statistics for your educational content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  views: {
                    label: "Views",
                    theme: {
                      light: "#4f46e5",
                      dark: "#6366f1",
                    },
                  },
                }}
              >
                <RechartsBarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent indicator="line" />
                    }
                  />
                  <Bar dataKey="views" name="views" fill="var(--color-views)" />
                </RechartsBarChart>
              </ChartContainer>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Popular Videos</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Video Title</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Avg. Watch Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Introduction to Calculus</TableCell>
                    <TableCell>245K</TableCell>
                    <TableCell>86%</TableCell>
                    <TableCell>15:22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Limits and Derivatives</TableCell>
                    <TableCell>198K</TableCell>
                    <TableCell>82%</TableCell>
                    <TableCell>17:45</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Integral Calculus Basics</TableCell>
                    <TableCell>156K</TableCell>
                    <TableCell>78%</TableCell>
                    <TableCell>14:10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="earnings" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Earnings Dashboard</CardTitle>
            <CardDescription>Track your revenue from educational content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Earnings</CardDescription>
                  <CardTitle className="text-2xl flex items-center text-strike-600">
                    <DollarSign className="h-5 w-5 mr-1" />
                    350.00
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Earnings</CardDescription>
                  <CardTitle className="text-2xl flex items-center text-strike-600">
                    <DollarSign className="h-5 w-5 mr-1" />
                    4,250.00
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Earnings Per Video</CardDescription>
                  <CardTitle className="text-2xl flex items-center text-strike-600">
                    <DollarSign className="h-5 w-5 mr-1" />
                    88.54
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            
            <div className="h-80">
              <ChartContainer
                config={{
                  earnings: {
                    label: "Earnings",
                    theme: {
                      light: "#0ea5e9",
                      dark: "#38bdf8",
                    },
                  },
                }}
              >
                <RechartsBarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent indicator="line" />
                    }
                  />
                  <Bar dataKey="earnings" name="earnings" fill="var(--color-earnings)" />
                </RechartsBarChart>
              </ChartContainer>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button className="mx-2">
                <Download className="mr-2 h-4 w-4" />
                Download Earnings Report
              </Button>
              <Button variant="outline" className="mx-2">
                <DollarSign className="mr-2 h-4 w-4" />
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="sessions" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Live Teaching Sessions</CardTitle>
            <CardDescription>Schedule and manage your live classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Session
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((session, index) => (
                  <TableRow key={index}>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.time}</TableCell>
                    <TableCell className="font-medium">{session.title}</TableCell>
                    <TableCell>{session.students}</TableCell>
                    <TableCell>{session.duration}</TableCell>
                    <TableCell>{session.price}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Cancel</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// Student-specific content component
const StudentProfileContent = ({ 
  savedVideos, 
  progressData, 
  testData 
}: { 
  savedVideos: any[], 
  progressData: any[], 
  testData: any[] 
}) => {
  const [syllabus, setSyllabus] = useState<File | null>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSyllabus(file);
    }
  };
  
  return (
    <Tabs defaultValue="learning" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="learning">Learning History</TabsTrigger>
        <TabsTrigger value="saved">Saved Videos</TabsTrigger>
        <TabsTrigger value="progress">Progress Tracker</TabsTrigger>
        <TabsTrigger value="study">Study Plan</TabsTrigger>
      </TabsList>
      
      <TabsContent value="learning" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Recently Watched</CardTitle>
            <CardDescription>Continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {savedVideos.slice(0, 4).map((video) => (
                <VideoCard key={`history-${video.id}`} {...video} />
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Learning Activity</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Video</TableHead>
                    <TableHead>Date Watched</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Introduction to Calculus</TableCell>
                    <TableCell>Today</TableCell>
                    <TableCell>75%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Continue</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">JavaScript Basics</TableCell>
                    <TableCell>Yesterday</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Rewatch</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Chemistry 101</TableCell>
                    <TableCell>3 days ago</TableCell>
                    <TableCell>60%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Continue</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="saved" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Saved for Later</CardTitle>
            <CardDescription>Videos you've bookmarked for future learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {savedVideos.map((video) => (
                <VideoCard key={video.id} {...video} isSaved={true} />
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="progress" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Track your educational journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Subject Progress</h3>
                {progressData.map((subject, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{subject.subject}</span>
                      <span>{subject.completed}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-strike-500 h-2.5 rounded-full" 
                        style={{ width: `${subject.completed}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Test Performance</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Percentile</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testData.map((test, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{test.test}</TableCell>
                        <TableCell>{test.score}%</TableCell>
                        <TableCell>{test.percentile}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Achievement Badges</h3>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="mt-2 text-sm">Math Master</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="mt-2 text-sm">100+ Hours</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="mt-2 text-sm">Dedicated Learner</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="study" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Personalized Study Plan</CardTitle>
            <CardDescription>AI-generated learning path based on your syllabus</CardDescription>
          </CardHeader>
          <CardContent>
            {!syllabus ? (
              <div className="text-center py-8">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Your Syllabus</h3>
                <p className="text-muted-foreground mb-6">
                  Our AI will analyze your syllabus and create a personalized study plan
                </p>
                <div className="flex justify-center">
                  <input
                    type="file"
                    id="syllabus-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button onClick={() => document.getElementById("syllabus-upload")?.click()}>
                    <Download className="mr-2 h-4 w-4" />
                    Upload Syllabus
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-muted p-4 rounded-lg mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-strike-500" />
                    <span>{syllabus.name}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Recommended Study Schedule</h3>
                
                <div className="border rounded-lg divide-y">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Week 1: Calculus Fundamentals</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Current
                      </span>
                    </div>
                    <ul className="space-y-2 ml-6 list-disc text-sm">
                      <li>Introduction to Limits (2 hours)</li>
                      <li>Continuity Principles (3 hours)</li>
                      <li>Basic Differentiation (4 hours)</li>
                      <li>Practice Problems Set 1 (2 hours)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Week 2: Advanced Derivatives</h4>
                    <ul className="space-y-2 ml-6 list-disc text-sm">
                      <li>Chain Rule (2 hours)</li>
                      <li>Implicit Differentiation (3 hours)</li>
                      <li>Applications of Derivatives (4 hours)</li>
                      <li>Practice Problems Set 2 (2 hours)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Week 3: Integration Basics</h4>
                    <ul className="space-y-2 ml-6 list-disc text-sm">
                      <li>Antiderivatives (2 hours)</li>
                      <li>Definite Integrals (3 hours)</li>
                      <li>Fundamental Theorem of Calculus (3 hours)</li>
                      <li>Practice Problems Set 3 (2 hours)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Study Plan
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Profile;
