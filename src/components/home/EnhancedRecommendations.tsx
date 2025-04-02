
import { useState } from "react";
import { useRecommendedVideos, Video } from "@/utils/recommendationEngine";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video/VideoPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "./VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle } from "lucide-react";

interface EnhancedRecommendationsProps {
  onVideoClick?: (video: Video) => void;
}

// Default thumbnails from the provided examples
const DEFAULT_THUMBNAILS = [
  "public/lovable-uploads/25896976-4caa-4dc8-a964-fd6f1ebe235e.png",
  "public/lovable-uploads/4dbd8351-9edf-4d34-be88-1622c97696ca.png",
  "public/lovable-uploads/652fa740-6010-4c33-8f9c-ba3316fe937f.png",
  "public/lovable-uploads/c71035c9-bd56-400e-a53a-173b4b33e265.png"
];

const EnhancedRecommendations = ({ onVideoClick }: EnhancedRecommendationsProps) => {
  const { videos: regularVideos, loading: loadingRegular } = useRecommendedVideos(false);
  const { videos: shortVideos, loading: loadingShorts } = useRecommendedVideos(true);
  const [activeTab, setActiveTab] = useState("regular");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  // Add thumbnails to videos that don't have them
  const enhancedRegularVideos = regularVideos.map((video, index) => ({
    ...video,
    thumbnail: video.thumbnail || DEFAULT_THUMBNAILS[index % DEFAULT_THUMBNAILS.length]
  }));
  
  const enhancedShortVideos = shortVideos.map((video, index) => ({
    ...video,
    thumbnail: video.thumbnail || DEFAULT_THUMBNAILS[index % DEFAULT_THUMBNAILS.length]
  }));
  
  const handleVideoClick = (video: Video) => {
    if (onVideoClick) {
      onVideoClick(video);
    } else if (video.videoUrl) {
      setPlayingVideoId(video.id === playingVideoId ? null : video.id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Personalized Recommendations</h2>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="regular">Regular</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="regular" className="mt-0">
        {loadingRegular ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-md mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {enhancedRegularVideos.map((video) => (
              <div key={video.id}>
                {playingVideoId === video.id && video.videoUrl ? (
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <VideoPlayer 
                        src={video.videoUrl}
                        thumbnail={video.thumbnail}
                        title={video.title}
                        autoPlay={true}
                        onEnded={() => setPlayingVideoId(null)}
                        className="w-full aspect-video"
                      />
                      <div className="p-3">
                        <h3 className="font-medium line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.teacher.name}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 w-full" 
                          onClick={() => setPlayingVideoId(null)}
                        >
                          Close
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <VideoCard 
                    id={video.id}
                    title={video.title}
                    channelName={video.teacher.name}
                    channelAvatar={video.teacher.avatar}
                    thumbnail={video.thumbnail}
                    views={video.views}
                    publishedAt={video.uploadDate}
                    duration={`${Math.floor(video.duration / 60)}:${String(video.duration % 60).padStart(2, '0')}`}
                    onClick={() => handleVideoClick(video)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="shorts" className="mt-0">
        {loadingShorts ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[9/16] bg-muted rounded-md mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {enhancedShortVideos.map((video) => (
              <div 
                key={video.id} 
                className="cursor-pointer group relative" 
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden group-hover:shadow-lg transition-all">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                  </div>
                  
                  {/* Gradient overlay for text visibility */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <h3 className="text-sm font-medium line-clamp-2 mt-2">{video.title}</h3>
                <p className="text-xs text-muted-foreground">{video.views.toLocaleString()} views</p>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
    </div>
  );
};

export default EnhancedRecommendations;
