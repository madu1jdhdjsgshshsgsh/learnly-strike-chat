
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Clock } from "lucide-react";
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
}: VideoCardProps) => {
  const [saved, setSaved] = useState(isSaved);
  
  const formattedViews = views >= 1000000
    ? `${(views / 1000000).toFixed(1)}M views`
    : views >= 1000
    ? `${(views / 1000).toFixed(1)}K views`
    : `${views} views`;
  
  const publishedTime = formatDistanceToNow(publishedAt, { addSuffix: true });
  
  return (
    <Card className={cn("border-none shadow-none", className)}>
      <div className="space-y-2">
        <Link to={`/video/${id}`} className="block">
          <div className="relative aspect-video rounded-md overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
              {duration}
            </div>
          </div>
        </Link>
        <div className="flex gap-3 pt-2">
          <Link to={`/channel/${channelName.toLowerCase().replace(/\s+/g, '-')}`} className="flex-shrink-0">
            <Avatar className="h-9 w-9">
              <AvatarImage src={channelAvatar} />
              <AvatarFallback className="bg-strike-100 text-strike-800">
                {channelName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={`/video/${id}`} className="block">
              <h3 className="font-medium line-clamp-2 hover:text-strike-600">{title}</h3>
            </Link>
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
