
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Menu, 
  Search, 
  Video, 
  BookOpen, 
  MessageSquare,
  LogOut,
  User,
  Settings,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    // In a real app, this would handle logout functionality
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6 h-full">
                <Link to="/home" className="flex items-center gap-2 py-2">
                  <span className="text-xl font-bold text-strike-500">Strike</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  <Link
                    to="/home"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted"
                  >
                    <Video className="h-5 w-5" />
                    <span>Videos</span>
                  </Link>
                  <Link
                    to="/ai-companion"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>AI Companion</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/home" className="flex items-center gap-2">
            <span className="text-xl font-bold text-strike-500 hidden sm:inline-block">Strike</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/home"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
            >
              <Video className="h-5 w-5" />
              <span>Videos</span>
            </Link>
            <Link
              to="/ai-companion"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
            >
              <BookOpen className="h-5 w-5" />
              <span>AI Companion</span>
            </Link>
          </nav>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos, topics..."
              className="w-full pl-8 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3"
            >
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Link to="/chat">
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-strike-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-strike-500"></span>
              </span>
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-strike-100 text-strike-800">
                    US
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/help")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
