
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRecommendedVideos, type Video } from "@/utils/recommendationEngine";
import VideoCard from './VideoCard';
import { Loader2, Dices } from 'lucide-react';

const EnhancedRecommendations = () => {
  const { videos: regularVideos, loading: loadingRegular } = useRecommendedVideos(false);
  const { videos: shortVideos, loading: loadingShorts } = useRecommendedVideos(true);
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
        <CardDescription>
          Content tailored to your learning preferences and goals
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="all" className="flex-1">All Videos</TabsTrigger>
              <TabsTrigger value="shorts" className="flex-1">Short Lessons</TabsTrigger>
              <TabsTrigger value="exams" className="flex-1">Exam Prep</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            {loadingRegular ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-strike-500" />
              </div>
            ) : (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regularVideos.map(video => (
                    <VideoCard
                      key={video.id}
                      id={video.id}
                      title={video.title}
                      channelName={video.teacher.name}
                      channelAvatar={video.teacher.avatar}
                      thumbnail={video.thumbnail}
                      views={video.views}
                      publishedAt={video.uploadDate}
                      duration={formatDuration(video.duration)}
                    />
                  ))}
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="gap-2">
                    <Dices className="h-4 w-4" />
                    More Recommendations
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="shorts" className="mt-0">
            {loadingShorts ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-strike-500" />
              </div>
            ) : (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                  {shortVideos.map(video => (
                    <VideoCard
                      key={video.id}
                      id={video.id}
                      title={video.title}
                      channelName={video.teacher.name}
                      channelAvatar={video.teacher.avatar}
                      thumbnail={video.thumbnail} 
                      views={video.views}
                      publishedAt={video.uploadDate}
                      duration={formatDuration(video.duration)}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="exams" className="mt-0">
            {loadingRegular ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-strike-500" />
              </div>
            ) : (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regularVideos
                    .filter(video => video.examRelated)
                    .map(video => (
                      <VideoCard
                        key={video.id}
                        id={video.id}
                        title={video.title}
                        channelName={video.teacher.name}
                        channelAvatar={video.teacher.avatar}
                        thumbnail={video.thumbnail}
                        views={video.views}
                        publishedAt={video.uploadDate}
                        duration={formatDuration(video.duration)}
                      />
                    ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Helper function to format duration from seconds to MM:SS
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default EnhancedRecommendations;
