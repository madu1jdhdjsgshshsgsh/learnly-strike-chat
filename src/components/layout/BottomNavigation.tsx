
import { Link, useLocation } from "react-router-dom";
import { Home, Video, User, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BottomNavigation = () => {
  const location = useLocation();
  const activeRoute = location.pathname;
  
  const isActive = (route: string) => {
    return activeRoute === route;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 px-2 flex items-center justify-around z-50">
      <Link to="/home" className="flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`w-full h-full rounded-none flex flex-col items-center justify-center gap-1 ${isActive('/home') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>
      </Link>
      
      <Link to="/shorts" className="flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`w-full h-full rounded-none flex flex-col items-center justify-center gap-1 ${isActive('/shorts') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Video className="h-5 w-5" />
          <span className="text-xs">Shorts</span>
        </Button>
      </Link>
      
      <Link to="/ai-companion" className="flex-1">
        <Button 
          variant="ghost" 
          size="icon"
          className={`w-full h-full rounded-none flex flex-col items-center justify-center gap-1 ${isActive('/ai-companion') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Bot className="h-5 w-5" />
          <span className="text-xs">AI Tutor</span>
        </Button>
      </Link>
      
      <Link to="/chat" className="flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`w-full h-full rounded-none flex flex-col items-center justify-center gap-1 ${isActive('/chat') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs">Chat</span>
        </Button>
      </Link>
      
      <Link to="/profile" className="flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`w-full h-full rounded-none flex flex-col items-center justify-center gap-1 ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </Link>
    </div>
  );
};
