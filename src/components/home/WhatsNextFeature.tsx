
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, PlayCircle, Clock } from "lucide-react";
import { useWhatsNextRecommendation, type Video } from "@/utils/recommendationEngine";

const WhatsNextFeature = () => {
  const { nextVideo, loading } = useWhatsNextRecommendation();
  const [isPlaying, setIsPlaying] = useState(false);

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
    // In a real app, this would navigate to the video player or start playing
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
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
          <img 
            src={nextVideo.thumbnail} 
            alt={nextVideo.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handlePlay}
              disabled={isPlaying}
            >
              {isPlaying ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <PlayCircle className="h-8 w-8" />
              )}
            </Button>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(nextVideo.duration)}
          </div>
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
        <Button variant="outline" size="sm">
          Save for later
        </Button>
        <Button className="bg-strike-500 hover:bg-strike-600" size="sm" onClick={handlePlay} disabled={isPlaying}>
          {isPlaying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Playing...
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              Watch Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WhatsNextFeature;
