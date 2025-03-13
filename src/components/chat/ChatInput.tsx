
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Upload, MicIcon, StopCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onQuickQuestion: (question: string) => void;
  onToggleRecording: () => void;
  onTriggerFileUpload: () => void;
  isRecording: boolean;
  isUploading: boolean;
}

const ChatInput = ({ 
  onSendMessage, 
  onQuickQuestion, 
  onToggleRecording, 
  onTriggerFileUpload,
  isRecording,
  isUploading
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
    // Focus the input element
    const inputElement = document.getElementById("message-input");
    if (inputElement) {
      inputElement.focus();
    }
    onQuickQuestion(question);
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="mb-3">
        <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => handleQuickQuestion("What's the formula for force in physics?")}
          >
            Force formula
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => handleQuickQuestion("What is the capital of France?")}
          >
            Capital of France
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => handleQuickQuestion("How many planets are in our solar system?")}
          >
            Solar system planets
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onTriggerFileUpload}
          disabled={isUploading}
        >
          {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleRecording}
          className={cn(isRecording && "text-red-500")}
        >
          {isRecording ? (
            <StopCircle className="h-5 w-5" />
          ) : (
            <MicIcon className="h-5 w-5" />
          )}
        </Button>
        <Input
          id="message-input"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1"
        />
        <Button 
          size="icon" 
          onClick={handleSendMessage} 
          disabled={!message.trim()}
          className="bg-strike-500 hover:bg-strike-600"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
