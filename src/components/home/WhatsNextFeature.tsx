
import { useState } from "react";
import { useWhatsNextRecommendation, Video } from "@/utils/recommendationEngine";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import VideoPlayer from "@/components/video/VideoPlayer";

interface WhatsNextFeatureProps {
  onVideoClick?: (video: Video) => void;
}

const WhatsNextFeature = ({ onVideoClick }: WhatsNextFeatureProps) => {
  const { nextVideo, loading } = useWhatsNextRecommendation();
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <Skeleton className="aspect-video w-full md:w-2/3" />
              <div className="p-4 md:p-6 md:w-1/3">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-6" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!nextVideo) {
    return null;
  }
  
  const formattedDate = formatDistanceToNow(new Date(nextVideo.uploadDate), { addSuffix: true });
  const viewCount = nextVideo.views >= 1000000
    ? `${(nextVideo.views / 1000000).toFixed(1)}M views`
    : nextVideo.views >= 1000
    ? `${(nextVideo.views / 1000).toFixed(1)}K views`
    : `${nextVideo.views} views`;
  
  const handlePlayClick = () => {
    if (onVideoClick) {
      onVideoClick(nextVideo);
    } else {
      setIsPlaying(true);
    }
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-2/3">
              {isPlaying && nextVideo.videoUrl ? (
                <VideoPlayer 
                  src={nextVideo.videoUrl}
                  thumbnail={nextVideo.thumbnail}
                  title={nextVideo.title}
                  autoPlay={true}
                  className="w-full aspect-video"
                />
              ) : (
                <div 
                  className="relative w-full aspect-video cursor-pointer"
                  onClick={handlePlayClick}
                >
                  <img 
                    src={nextVideo.thumbnail || '/placeholder.svg'} 
                    alt={nextVideo.title}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                    {Math.floor(nextVideo.duration / 60)}:{String(nextVideo.duration % 60).padStart(2, '0')}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 md:p-6 md:w-1/3 flex flex-col">
              <h3 className="text-lg font-semibold mb-1">{nextVideo.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {nextVideo.teacher.name} • {viewCount} • {formattedDate}
              </p>
              <p className="text-sm mb-4">
                Continue where you left off in this lesson about {nextVideo.topics.join(", ")}.
              </p>
              
              <div className="mt-auto space-y-2">
                <Button 
                  onClick={handlePlayClick} 
                  className="w-full"
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Play Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Save for Later
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsNextFeature;
