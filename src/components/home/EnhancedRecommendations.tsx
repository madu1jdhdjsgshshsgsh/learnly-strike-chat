
import { useState } from "react";
import { useRecommendedVideos, Video } from "@/utils/recommendationEngine";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video/VideoPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "./VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EnhancedRecommendationsProps {
  onVideoClick?: (video: Video) => void;
}

const EnhancedRecommendations = ({ onVideoClick }: EnhancedRecommendationsProps) => {
  const { videos: regularVideos, loading: loadingRegular } = useRecommendedVideos(false);
  const { videos: shortVideos, loading: loadingShorts } = useRecommendedVideos(true);
  const [activeTab, setActiveTab] = useState("regular");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
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
            {regularVideos.map((video) => (
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
            {shortVideos.map((video) => (
              <div key={video.id} className="cursor-pointer" onClick={() => handleVideoClick(video)}>
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden mb-2">
                  <img 
                    src={video.thumbnail || '/placeholder.svg'} 
                    alt={video.title}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                    {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
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
