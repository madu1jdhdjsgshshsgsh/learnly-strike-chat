
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Lightbulb, Book, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MessageType = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "Hello! I'm your AI study assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      // Generate a response based on the question
      let responseContent = "";
      const lowercaseMessage = message.toLowerCase();
      
      if (lowercaseMessage.includes("calculus") || lowercaseMessage.includes("derivative")) {
        responseContent = "In calculus, a derivative measures the sensitivity to change of a function's output with respect to its input. The derivative of a function f(x) is denoted as f'(x). For example, if f(x) = x², then f'(x) = 2x.";
      } else if (lowercaseMessage.includes("python") || lowercaseMessage.includes("code")) {
        responseContent = "Python is a high-level programming language known for its readability. Here's a simple example:\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"Student\"))\n```\n\nThis code defines a function that takes a name parameter and returns a greeting.";
      } else if (lowercaseMessage.includes("quiz") || lowercaseMessage.includes("test")) {
        responseContent = "I can help you prepare for quizzes! Would you like me to create practice questions on a specific topic? Or I can explain quiz-taking strategies if you prefer.";
      } else {
        responseContent = "That's an interesting question! I'd be happy to help you understand this topic better. Could you provide a bit more context or tell me what specific aspect you're struggling with?";
      }
      
      const assistantMessage: MessageType = {
        id: Date.now().toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
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
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {msg.sender === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-strike-500 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-strike-500 text-white"
                        : "bg-secondary"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <div
                      className={`text-xs mt-1 ${
                        msg.sender === "user"
                          ? "text-strike-100"
                          : "text-muted-foreground"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-secondary">
                        ME
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-strike-500 text-white">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-3 rounded-lg bg-secondary">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4 border-t">
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => handleQuickQuestion("Can you explain derivatives in calculus?")}
            >
              <Calculator className="mr-1 h-3 w-3" />
              Calculus derivatives
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => handleQuickQuestion("Help me with Python functions")}
            >
              <Book className="mr-1 h-3 w-3" />
              Python functions
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => handleQuickQuestion("Create a quiz on world history")}
            >
              <Lightbulb className="mr-1 h-3 w-3" />
              Create history quiz
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              toast({
                title: "Feature coming soon",
                description: "File upload feature is not available yet.",
              });
            }}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            id="message-input"
            placeholder="Ask me anything about your studies..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
