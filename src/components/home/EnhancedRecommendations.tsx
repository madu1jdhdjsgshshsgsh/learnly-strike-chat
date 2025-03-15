
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getRecommendedVideos, 
  getNextVideo,
  getTrendingExamContent,
  Video 
} from "@/utils/recommendationEngine";
import VideoCard from "./VideoCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, History, Star } from "lucide-react";

const EnhancedRecommendations = () => {
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
  const [shortVideos, setShortVideos] = useState<Video[]>([]);
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [nextVideo, setNextVideo] = useState<Video | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch recommended videos
    const videos = getRecommendedVideos(undefined, 8, false);
    setRecommendedVideos(videos);
    
    // Fetch short videos
    const shorts = getRecommendedVideos(undefined, 4, true);
    setShortVideos(shorts);
    
    // Fetch trending exam content
    const trending = getTrendingExamContent("general");
    setTrendingVideos(trending);
    
    // Set what's next - for demo, we'll use the last watched video
    // In a real app, this would come from the user's actual last watched video
    const lastWatchedId = "video-1"; // Simulating a recently watched video
    const next = getNextVideo(lastWatchedId);
    setNextVideo(next);
  }, []);
  
  return (
    <div className="space-y-8">
      {/* What's Next recommendation */}
      {nextVideo && (
        <Card className="border-strike-100">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="h-5 w-5 text-strike-500" />
                What's Next
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(`/video/${nextVideo.id}`)}
              >
                View All
              </Button>
            </div>
            <CardDescription>
              Based on your recent learning activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <VideoCard {...nextVideo} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow" />
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Main recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-strike-500" />
              Personalized Recommendations
            </CardTitle>
          </div>
          <CardDescription>
            Content tailored to your learning style and interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="videos">Full Videos</TabsTrigger>
              <TabsTrigger value="shorts">Short Lessons</TabsTrigger>
              <TabsTrigger value="trending">Exam Prep</TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recommendedVideos.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="shorts" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {shortVideos.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {trendingVideos.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
                <div className="col-span-full flex justify-center my-4">
                  <Button className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    View More Exam Preparation Content
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Watch History Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <History className="h-5 w-5 text-strike-500" />
              Continue Learning
            </CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <CardDescription>
            Pick up where you left off
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recommendedVideos.slice(0, 4).map((video) => (
              <VideoCard key={`history-${video.id}`} {...video} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedRecommendations;
