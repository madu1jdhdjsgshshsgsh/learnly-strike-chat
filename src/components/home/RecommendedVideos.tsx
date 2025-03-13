
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulated data for recommended videos
const mockVideos = [
  {
    id: "video-1",
    title: "Introduction to Calculus: Limits and Derivatives",
    channelName: "Math Masters",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=1000",
    views: 245000,
    publishedAt: new Date(2023, 8, 15),
    duration: "18:42",
    category: "math"
  },
  {
    id: "video-2",
    title: "Learn Python Programming: Complete Course for Beginners",
    channelName: "Code Mastery",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
    views: 578000,
    publishedAt: new Date(2023, 9, 3),
    duration: "1:24:36",
    category: "programming"
  },
  {
    id: "video-3",
    title: "Chemistry Basics: Atomic Structure and Periodic Table",
    channelName: "Science Simplified",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=1000",
    views: 189000,
    publishedAt: new Date(2023, 7, 22),
    duration: "15:18",
    category: "science"
  },
  {
    id: "video-4",
    title: "World War II: Major Events and Timeline",
    channelName: "History Horizon",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&q=80&w=1000",
    views: 392000,
    publishedAt: new Date(2023, 6, 12),
    duration: "22:45",
    category: "history"
  },
  {
    id: "video-5",
    title: "Advanced JavaScript: Promises and Async/Await",
    channelName: "Web Dev Warriors",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    views: 215000,
    publishedAt: new Date(2023, 8, 28),
    duration: "27:14",
    category: "programming"
  },
  {
    id: "video-6",
    title: "Digital Art Fundamentals: From Sketch to Final Piece",
    channelName: "Creative Canvas",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=1000",
    views: 167000,
    publishedAt: new Date(2023, 9, 10),
    duration: "41:09",
    category: "art"
  },
  {
    id: "video-7",
    title: "Biology: The Cell Structure and Functions",
    channelName: "Science Simplified",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000",
    views: 231000,
    publishedAt: new Date(2023, 8, 5),
    duration: "19:52",
    category: "science"
  },
  {
    id: "video-8",
    title: "Marketing Strategies for Small Businesses",
    channelName: "Business Boost",
    channelAvatar: "",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
    views: 128000,
    publishedAt: new Date(2023, 9, 1),
    duration: "32:18",
    category: "business"
  },
];

const RecommendedVideos = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredVideos(mockVideos);
    } else {
      setFilteredVideos(mockVideos.filter(video => video.category === activeTab));
    }
  }, [activeTab]);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-transparent border-b w-full justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="math">Mathematics</TabsTrigger>
            <TabsTrigger value="programming">Programming</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </TabsContent>
        
        {["math", "programming", "science", "history", "art", "business"].map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RecommendedVideos;
