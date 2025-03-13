
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { type MessageType } from "@/hooks/useChat";

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[80%] ${
          message.sender === "user" ? "flex-row-reverse" : ""
        }`}
      >
        {message.sender === "assistant" && (
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-strike-500 text-white">
              AI
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${
            message.sender === "user"
              ? "bg-strike-500 text-white"
              : "bg-secondary"
          }`}
        >
          {message.isLoading ? (
            <div className="flex items-center space-x-2 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          ) : (
            <>
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.attachment && (
                <div className="mt-2">
                  {message.attachment.type === "video" && (
                    <video 
                      src={message.attachment.url} 
                      controls 
                      className="max-w-full rounded-md max-h-60 mt-2"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {message.attachment.type === "image" && (
                    <img 
                      src={message.attachment.url} 
                      alt={message.attachment.name}
                      className="max-w-full rounded-md max-h-60 mt-2"
                    />
                  )}
                  {message.attachment.type === "document" && (
                    <div className="bg-muted p-2 rounded-md mt-2 flex items-center">
                      <span className="text-sm truncate">
                        {message.attachment.name}
                      </span>
                      <a 
                        href={message.attachment.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-strike-500 hover:text-strike-600 text-xs"
                      >
                        View
                      </a>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          <div
            className={`text-xs mt-1 ${
              message.sender === "user"
                ? "text-strike-100"
                : "text-muted-foreground"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        {message.sender === "user" && (
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-secondary">
              ME
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
