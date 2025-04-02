import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import EnhancedRecommendations from "@/components/home/EnhancedRecommendations";
import WhatsNextFeature from "@/components/home/WhatsNextFeature";
import CategoryBar from "@/components/home/CategoryBar";
import { useRecommendedVideos, Video } from "@/utils/recommendationEngine";
import VideoCard from "@/components/home/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video/VideoPlayer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Home = () => {
  const [activeMainCategory, setActiveMainCategory] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const { videos, loading } = useRecommendedVideos(false);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

  const subCategories = ["All", "Science", "Math", "Coding", "Exam Prep", "Languages", "Arts", "Humanities", "History", "Technology", "Business"];

  useEffect(() => {
    if (activeSubCategory === "All") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(video => 
        video.topics.some(topic => 
          topic.toLowerCase().includes(activeSubCategory.toLowerCase())
        )
      );
      setFilteredVideos(filtered.length > 0 ? filtered : videos);
    }
  }, [videos, activeSubCategory]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-6 mb-16">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to your learning dashboard</h1>
          
          <Tabs defaultValue="all" value={activeMainCategory} onValueChange={setActiveMainCategory} className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full md:w-auto mb-4">
                <TabsTrigger value="all">All Content</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="space-y-6">
              <div className="py-2">
                <CategoryBar 
                  categories={subCategories}
                  activeCategory={activeSubCategory}
                  onSelectCategory={setActiveSubCategory}
                />
              </div>
              
              <WhatsNextFeature onVideoClick={handleVideoClick} />
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Educational Videos</h2>
                
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="aspect-video bg-muted rounded-md mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredVideos.map((video) => (
                      <VideoCard 
                        key={video.id}
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
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="recommended">
              <EnhancedRecommendations onVideoClick={handleVideoClick} />
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="text-muted-foreground">Trending videos will appear here</div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="text-muted-foreground">Your saved videos will appear here</div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="text-muted-foreground">Your watch history will appear here</div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          {selectedVideo?.videoUrl && (
            <VideoPlayer 
              src={selectedVideo.videoUrl} 
              thumbnail={selectedVideo.thumbnail}
              title={selectedVideo.title}
              onEnded={() => setIsVideoModalOpen(false)}
              className="w-full"
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Home;
