
import { Link, useLocation } from "react-router-dom";
import { Home, Video, Upload, User, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UploadVideoForm } from "@/components/upload/UploadVideoForm";

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
          <Play className="h-5 w-5" />
          <span className="text-xs">Shorts</span>
        </Button>
      </Link>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="flex-1 w-full h-full rounded-none flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="bg-primary text-white p-2 rounded-full">
              <Upload className="h-5 w-5" />
            </div>
            <span className="text-xs">Upload</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
          </DialogHeader>
          <UploadVideoForm />
        </DialogContent>
      </Dialog>
      
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
      
      <Link to="/settings" className="flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`w-full h-full rounded-none flex flex-col items-center justify-center gap-1 ${isActive('/settings') ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Video className="h-5 w-5" />
          <span className="text-xs">Videos</span>
        </Button>
      </Link>
    </div>
  );
};
