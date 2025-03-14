
import { Button } from "@/components/ui/button";
import { type ChatCategory } from "@/hooks/useChat";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatHeaderProps {
  category: ChatCategory;
  onCategoryChange: (category: ChatCategory) => void;
}

const ChatHeader = ({ category, onCategoryChange }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b bg-muted/30">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          AI Assistant
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                  Gemini API <Info className="h-3 w-3 ml-1" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Powered by Google's Gemini API</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <div className="flex gap-2">
          <Button 
            variant={category === "general" ? "default" : "outline"} 
            size="sm"
            onClick={() => onCategoryChange("general")}
            className="text-xs"
          >
            General
          </Button>
          <Button 
            variant={category === "homework" ? "default" : "outline"} 
            size="sm"
            onClick={() => onCategoryChange("homework")}
            className="text-xs"
          >
            Homework Help
          </Button>
          <Button 
            variant={category === "concept" ? "default" : "outline"} 
            size="sm"
            onClick={() => onCategoryChange("concept")}
            className="text-xs"
          >
            Explain Concepts
          </Button>
          <Button 
            variant={category === "exam" ? "default" : "outline"} 
            size="sm"
            onClick={() => onCategoryChange("exam")}
            className="text-xs"
          >
            Exam Prep
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
