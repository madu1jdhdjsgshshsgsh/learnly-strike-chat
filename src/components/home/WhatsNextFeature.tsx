
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

// Default thumbnails from the provided examples
const DEFAULT_THUMBNAILS = [
  "public/lovable-uploads/25896976-4caa-4dc8-a964-fd6f1ebe235e.png",
  "public/lovable-uploads/4dbd8351-9edf-4d34-be88-1622c97696ca.png",
  "public/lovable-uploads/652fa740-6010-4c33-8f9c-ba3316fe937f.png",
  "public/lovable-uploads/c71035c9-bd56-400e-a53a-173b4b33e265.png"
];

const WhatsNextFeature = ({ onVideoClick }: WhatsNextFeatureProps) => {
  const { nextVideo, loading } = useWhatsNextRecommendation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
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
  
  const thumbnail = nextVideo.thumbnail || DEFAULT_THUMBNAILS[0];
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
                  thumbnail={thumbnail}
                  title={nextVideo.title}
                  autoPlay={true}
                  className="w-full aspect-video"
                />
              ) : (
                <div 
                  className="relative w-full aspect-video cursor-pointer group"
                  onClick={handlePlayClick}
                >
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-200 animate-pulse">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  <img 
                    src={thumbnail} 
                    alt={nextVideo.title}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${!imageLoaded ? 'opacity-0' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-4 rounded-full bg-black/50 backdrop-blur-sm">
                      <PlayCircle className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                    {Math.floor(nextVideo.duration / 60)}:{String(nextVideo.duration % 60).padStart(2, '0')}
                  </div>
                  
                  {/* Title overlay at the bottom for small screens */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent md:hidden">
                    <h3 className="text-white text-lg font-semibold drop-shadow-md">
                      {nextVideo.title}
                    </h3>
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
