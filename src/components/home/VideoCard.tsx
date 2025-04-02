
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Clock, PlayCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoCardProps {
  id: string;
  title: string;
  channelName: string;
  channelAvatar?: string;
  thumbnail: string;
  views: number;
  publishedAt: Date;
  duration: string;
  className?: string;
  isSaved?: boolean;
  onClick?: () => void;
}

const VideoCard = ({
  id,
  title,
  channelName,
  channelAvatar,
  thumbnail,
  views,
  publishedAt,
  duration,
  className,
  isSaved = false,
  onClick,
}: VideoCardProps) => {
  const [saved, setSaved] = useState(isSaved);
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Default thumbnails from the provided examples
  const defaultThumbnails = [
    "public/lovable-uploads/25896976-4caa-4dc8-a964-fd6f1ebe235e.png",
    "public/lovable-uploads/4dbd8351-9edf-4d34-be88-1622c97696ca.png",
    "public/lovable-uploads/652fa740-6010-4c33-8f9c-ba3316fe937f.png",
    "public/lovable-uploads/c71035c9-bd56-400e-a53a-173b4b33e265.png"
  ];
  
  // Choose a random default thumbnail if the provided one fails
  const fallbackThumbnail = () => {
    const randomIndex = Math.floor(Math.random() * defaultThumbnails.length);
    return defaultThumbnails[randomIndex];
  };
  
  const formattedViews = views >= 1000000
    ? `${(views / 1000000).toFixed(1)}M views`
    : views >= 1000
    ? `${(views / 1000).toFixed(1)}K views`
    : `${views} views`;
  
  const publishedTime = formatDistanceToNow(publishedAt, { addSuffix: true });
  
  const handleThumbnailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <Card className={cn("border-none shadow-none group", className)}>
      <div className="space-y-2">
        <div 
          className="block cursor-pointer"
          onClick={handleThumbnailClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative aspect-video rounded-md overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-200 animate-pulse">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <img
              src={imageError ? fallbackThumbnail() : (thumbnail || fallbackThumbnail())}
              alt={title}
              className={cn(
                "w-full h-full object-cover transition-all duration-300", 
                isHovering ? "scale-110 brightness-90" : "",
                !imageLoaded && "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
            
            {/* Gradient overlay for better text visibility */}
            <div className={cn(
              "absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent",
              isHovering ? "opacity-100" : "opacity-0",
              "transition-opacity duration-300"
            )}></div>
            
            {/* Video hover overlay with play button */}
            {isHovering && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                <div className="p-3 rounded-full bg-black/50 backdrop-blur-sm">
                  <PlayCircle className="h-12 w-12 text-white" />
                </div>
              </div>
            )}
            
            {/* Video duration badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
              {duration}
            </div>
            
            {/* Video title on hover - for small screens */}
            {isHovering && (
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:hidden">
                <h3 className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
                  {title}
                </h3>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 pt-2">
          <Link to={`/channel/${channelName.toLowerCase().replace(/\s+/g, '-')}`} className="flex-shrink-0">
            <Avatar className="h-9 w-9">
              <AvatarImage src={channelAvatar} />
              <AvatarFallback className="bg-primary/20 text-primary-foreground">
                {channelName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <button 
              onClick={onClick}
              className="block w-full text-left"
            >
              <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
            </button>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Link to={`/channel/${channelName.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-foreground">
                {channelName}
              </Link>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <span>{formattedViews}</span>
              <span>•</span>
              <span>{publishedTime}</span>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full hover:bg-muted">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSaved(!saved)}>
                  <Clock className="mr-2 h-4 w-4" />
                  {saved ? "Remove from Watch Later" : "Save to Watch Later"}
                </DropdownMenuItem>
                <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                <DropdownMenuItem>Not Interested</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
