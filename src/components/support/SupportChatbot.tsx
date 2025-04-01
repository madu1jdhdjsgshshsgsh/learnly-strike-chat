
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon, Bot } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

type Message = {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

// Education-related responses for the chatbot
const educationResponses: Record<string, string> = {
  "help": "I can answer questions about education topics, courses, or using our platform. What would you like to know?",
  "contact": "You can reach our support team at support@strike-edu.com or call us at +1-800-555-0123.",
  "courses": "We offer courses in various categories including Mathematics, Science, Languages, Arts, Computer Science, and more!",
  "upload": "To upload a video as a creator, go to your profile page and click on the 'Upload Content' button. You'll need to specify the category during the upload process.",
  "categories": "Our educational content is organized into several categories: Academic (Math, Science, Languages), Skill Development, Professional Certification, and Hobbies & Interests.",
  "registration": "Registration is simple! Click the Sign Up button, fill in your details, choose if you're joining as a learner or creator, and you're all set!",
  "creator": "As a creator, you can upload educational videos, create courses, and earn based on engagement with your content.",
  "learner": "As a learner, you can access all educational content, track your progress, and engage with creators.",
  "default": "I'm still learning about educational topics. Could you rephrase your question or ask something about our courses, how to use the platform, or contact information?"
};

const SupportChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! I'm Strike's education assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput("");

    // Generate bot response based on keywords
    setTimeout(() => {
      const userInput = input.toLowerCase();
      let botResponse = educationResponses.default;

      // Check for keywords in user input
      if (userInput.includes("contact") || userInput.includes("phone") || userInput.includes("email") || userInput.includes("reach")) {
        botResponse = educationResponses.contact;
      } else if (userInput.includes("upload") || userInput.includes("video") || userInput.includes("create content")) {
        botResponse = educationResponses.upload;
      } else if (userInput.includes("course") || userInput.includes("class") || userInput.includes("learn")) {
        botResponse = educationResponses.courses;
      } else if (userInput.includes("category") || userInput.includes("categories") || userInput.includes("topics")) {
        botResponse = educationResponses.categories;
      } else if (userInput.includes("register") || userInput.includes("sign up") || userInput.includes("account")) {
        botResponse = educationResponses.registration;
      } else if (userInput.includes("creator") || userInput.includes("teach")) {
        botResponse = educationResponses.creator;
      } else if (userInput.includes("learner") || userInput.includes("student")) {
        botResponse = educationResponses.learner;
      } else if (userInput.includes("help") || userInput.includes("assistant")) {
        botResponse = educationResponses.help;
      }

      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 600);
  };

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Education Support Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    {message.sender === "bot" ? (
                      <Bot className="h-5 w-5" />
                    ) : (
                      <div className="h-full w-full bg-primary rounded-full flex items-center justify-center text-white">
                        U
                      </div>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-auto">
          <Input
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <Button size="icon" onClick={handleSend}>
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportChatbot;
