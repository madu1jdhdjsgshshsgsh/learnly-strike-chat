
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, PlayCircle, Clock, BookmarkPlus } from "lucide-react";
import { useWhatsNextRecommendation, type Video } from "@/utils/recommendationEngine";
import VideoPlayer from "@/components/video/VideoPlayer";
import { useToast } from "@/hooks/use-toast";

const WhatsNextFeature = () => {
  const { nextVideo, loading } = useWhatsNextRecommendation();
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="mr-2">
              <Clock className="h-5 w-5 text-strike-500" />
            </div>
            What's Next
          </CardTitle>
          <CardDescription>
            Finding your next learning recommendation...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-strike-500" />
        </CardContent>
      </Card>
    );
  }

  if (!nextVideo) {
    return null; // Don't show anything if no recommendation
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleSaveForLater = () => {
    toast({
      title: "Video saved",
      description: "This video has been saved to your Watch Later playlist.",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="mr-2">
            <Clock className="h-5 w-5 text-strike-500" />
          </div>
          What's Next
        </CardTitle>
        <CardDescription>
          Based on your learning journey, we recommend:
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <VideoPlayer
            src={nextVideo.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}
            thumbnail={nextVideo.thumbnail}
            title={nextVideo.title}
            autoPlay={false}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg line-clamp-2">{nextVideo.title}</h3>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <span>{nextVideo.teacher.name}</span>
            <span className="mx-2">•</span>
            <span>{nextVideo.views.toLocaleString()} views</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" onClick={handleSaveForLater}>
          <BookmarkPlus className="mr-2 h-4 w-4" />
          Save for later
        </Button>
        <Button 
          className="bg-strike-500 hover:bg-strike-600" 
          size="sm" 
          onClick={handlePlay}
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          Watch Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WhatsNextFeature;
