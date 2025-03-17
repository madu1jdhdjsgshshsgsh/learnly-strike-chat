
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  BookmarkPlus,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for shorts
const MOCK_SHORTS = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop",
    title: "Understanding Quadratic Equations",
    teacher: {
      name: "Sara Johnson",
      avatar: "",
      username: "saramath"
    },
    likes: 1245,
    comments: 89,
    description: "Quick tutorial on solving quadratic equations with easy examples."
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop",
    title: "Cell Division Explained",
    teacher: {
      name: "Dr. Mike Brown",
      avatar: "",
      username: "drmikebio"
    },
    likes: 986,
    comments: 42,
    description: "Understand mitosis and meiosis in under 60 seconds with simple animations."
  },
  {
    id: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop",
    title: "World War II: Key Events",
    teacher: {
      name: "History Hub",
      avatar: "",
      username: "historyhub"
    },
    likes: 2345,
    comments: 124,
    description: "Quick recap of the most important events of World War II for exam preparation."
  }
];

export const ShortsPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const { toast } = useToast();
  
  const currentShort = MOCK_SHORTS[currentIndex];
  
  // Initialize the first video as playing when component mounts
  useEffect(() => {
    setIsPlaying({ 0: true });
  }, []);
  
  const handleScroll = (direction: 'up' | 'down') => {
    const newIndex = direction === 'down' 
      ? Math.min(currentIndex + 1, MOCK_SHORTS.length - 1)
      : Math.max(currentIndex - 1, 0);
      
    if (newIndex !== currentIndex) {
      // Pause current video and stop showing it as playing
      if (videoRefs.current[currentIndex]) {
        videoRefs.current[currentIndex].pause();
      }
      
      setIsPlaying(prev => ({
        ...prev,
        [currentIndex]: false,
        [newIndex]: true
      }));
      
      setCurrentIndex(newIndex);
      
      // Play new video after a small delay
      setTimeout(() => {
        if (videoRefs.current[newIndex]) {
          videoRefs.current[newIndex].play();
        }
      }, 100);
    }
  };

  const handleVideoRef = (element: HTMLVideoElement | null, index: number) => {
    if (element) {
      videoRefs.current[index] = element;
      // Autoplay the first video
      if (index === currentIndex && isPlaying[index]) {
        element.play();
      }
    }
  };
  
  const togglePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    if (video.paused) {
      video.play();
      setIsPlaying(prev => ({ ...prev, [index]: true }));
    } else {
      video.pause();
      setIsPlaying(prev => ({ ...prev, [index]: false }));
    }
  };
  
  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    if (!liked[id]) {
      toast({
        title: "Video liked",
        description: "This video has been added to your liked videos.",
      });
    }
  };
  
  const toggleSave = (id: number) => {
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
    if (!saved[id]) {
      toast({
        title: "Video saved",
        description: "This video has been saved to your library.",
      });
    } else {
      toast({
        title: "Video removed",
        description: "This video has been removed from your library.",
      });
    }
  };
  
  const handleShare = () => {
    toast({
      title: "Share feature",
      description: "Sharing functionality would be implemented here.",
    });
  };
  
  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comment section would open here.",
    });
  };

  return (
    <div 
      className="h-full flex flex-col overflow-hidden"
      onWheel={(e) => handleScroll(e.deltaY > 0 ? 'down' : 'up')}
    >
      <div className="flex-1 relative" 
        onClick={() => togglePlayPause(currentIndex)}
      >
        {MOCK_SHORTS.map((short, index) => (
          <div 
            key={short.id}
            className={`absolute inset-0 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Thumbnail shown before video plays */}
            {!isPlaying[index] && (
              <div className="absolute inset-0 z-20">
                <img 
                  src={short.thumbnailUrl}
                  alt={short.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-black/40 text-white hover:bg-black/60 h-16 w-16"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause(index);
                    }}
                  >
                    <Play className="h-8 w-8" fill="white" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Actual video */}
            <video
              ref={(el) => handleVideoRef(el, index)}
              src={short.videoUrl}
              className="h-full w-full object-cover"
              loop
              muted={false}
              playsInline
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause(index);
              }}
              onPlay={() => setIsPlaying(prev => ({ ...prev, [index]: true }))}
              onPause={() => setIsPlaying(prev => ({ ...prev, [index]: false }))}
            />
            
            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-lg font-bold mb-1">{short.title}</h3>
              <div className="flex items-center mb-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={short.teacher.avatar} />
                  <AvatarFallback>{short.teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">@{short.teacher.username}</span>
              </div>
              <p className="text-sm line-clamp-2">{short.description}</p>
            </div>
            
            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(short.id);
                }}
              >
                <Heart className={`h-6 w-6 ${liked[short.id] ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleComment();
                }}
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
              >
                <Share2 className="h-6 w-6" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(short.id);
                }}
              >
                <BookmarkPlus className={`h-6 w-6 ${saved[short.id] ? 'fill-white' : ''}`} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Swipe indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
        {currentIndex < MOCK_SHORTS.length - 1 && (
          <div className="animate-bounce">
            Swipe up for next
          </div>
        )}
      </div>
    </div>
  );
};
