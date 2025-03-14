
import { Button } from "@/components/ui/button";
import { type ChatCategory } from "@/hooks/useChat";

interface ChatHeaderProps {
  category: ChatCategory;
  onCategoryChange: (category: ChatCategory) => void;
}

const ChatHeader = ({ category, onCategoryChange }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b bg-muted/30">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">AI Assistant (Powered by Gemini API)</h2>
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
