
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChat } from "@/hooks/useChat";

const ChatInterface = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const {
    messages,
    category,
    isRecording,
    isUploading,
    fileInputRef,
    sendMessage,
    setCategory,
    toggleRecording,
    handleFileUpload,
    triggerFileUpload,
  } = useChat();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const setChatCategory = (newCategory: typeof category) => {
    setCategory(newCategory);
    toast({
      title: `Chat mode changed to ${newCategory}`,
      description: `AI responses will now focus on ${newCategory} assistance.`,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ChatHeader 
        category={category} 
        onCategoryChange={setChatCategory} 
      />
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
        </ScrollArea>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
        accept="video/*,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />

      <ChatInput 
        onSendMessage={sendMessage}
        onQuickQuestion={sendMessage}
        onToggleRecording={toggleRecording}
        onTriggerFileUpload={triggerFileUpload}
        isRecording={isRecording}
        isUploading={isUploading}
      />
    </div>
  );
};

export default ChatInterface;
