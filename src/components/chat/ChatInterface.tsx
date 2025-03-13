
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Lightbulb, Book, Calculator, Loader2, MicIcon, StopCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type MessageType = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isLoading?: boolean;
  attachment?: {
    type: "video" | "image" | "document";
    url: string;
    name: string;
  };
};

type ChatCategory = "homework" | "concept" | "exam" | "general";

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
  const [isRecording, setIsRecording] = useState(false);
  const [category, setCategory] = useState<ChatCategory>("general");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      try {
        // Start recording
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          // Here you would normally send this to a speech-to-text service
          // For now, we'll just simulate the process
          setMessage("I have a question about the homework assignment...");
          toast({
            title: "Voice recorded",
            description: "Your voice has been converted to text. You can edit before sending.",
          });
          
          // Clean up the stream tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        toast({
          title: "Recording started",
          description: "Speak clearly into your microphone.",
        });
      } catch (error) {
        console.error("Error accessing microphone:", error);
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive",
        });
      }
    }
  };

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

    // Add loading message
    const loadingId = Date.now().toString() + "-loading";
    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        content: "",
        sender: "assistant",
        timestamp: new Date(),
        isLoading: true,
      },
    ]);
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      // Remove loading message and add actual response
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingId));

      // Generate a response based on the question and selected category
      let responseContent = generateResponse(message, category);
      
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

  const generateResponse = (userMessage: string, category: ChatCategory): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Special handling for physics formulas
    if (lowercaseMessage.includes("formula") && lowercaseMessage.includes("force")) {
      return "The formula for force is:\n\n**F = m × a**\n\nWhere:\n- F is force (measured in Newtons, N)\n- m is mass (measured in kilograms, kg)\n- a is acceleration (measured in meters per second squared, m/s²)\n\nThis is Newton's Second Law of Motion, which states that the force acting on an object is equal to the mass of that object times its acceleration.\n\nWould you like me to explain this further or provide examples?";
    }
    
    if (lowercaseMessage.includes("formula") && lowercaseMessage.includes("gravity")) {
      return "The formula for gravitational force is:\n\n**F = G × (m₁ × m₂) / r²**\n\nWhere:\n- F is the gravitational force between the objects (measured in Newtons, N)\n- G is the gravitational constant (6.674 × 10⁻¹¹ N·m²/kg²)\n- m₁ and m₂ are the masses of the objects (measured in kilograms, kg)\n- r is the distance between the centers of the masses (measured in meters, m)\n\nThis formula represents Newton's Law of Universal Gravitation.";
    }
    
    if (lowercaseMessage.includes("formula") && lowercaseMessage.includes("energy") && (lowercaseMessage.includes("kinetic") || lowercaseMessage.includes("motion"))) {
      return "The formula for kinetic energy is:\n\n**KE = ½ × m × v²**\n\nWhere:\n- KE is kinetic energy (measured in Joules, J)\n- m is mass (measured in kilograms, kg)\n- v is velocity (measured in meters per second, m/s)\n\nKinetic energy is the energy an object possesses due to its motion.";
    }
    
    // General responses based on categories
    switch(category) {
      case "homework":
        if (lowercaseMessage.includes("math") || lowercaseMessage.includes("equation") || lowercaseMessage.includes("problem")) {
          return "For math homework, let's break this down step by step:\n\n1. First, identify what type of problem you're working with (algebra, calculus, etc.)\n2. Write out all the given information\n3. Apply the relevant formulas or methods\n\nCould you share the specific problem you're struggling with?";
        } else if (lowercaseMessage.includes("essay") || lowercaseMessage.includes("writing") || lowercaseMessage.includes("paper")) {
          return "For writing assignments, I recommend:\n\n1. Start with a clear thesis statement\n2. Outline your main arguments\n3. Support each point with evidence\n4. Connect your ideas with smooth transitions\n\nWould you like help with developing your thesis or structuring your essay?";
        } else {
          return "I'd be happy to help with your homework! To provide the best assistance, could you:\n\n1. Tell me which subject this is for\n2. Share the specific question or task\n3. Let me know what part you find challenging\n\nThis will help me give you more targeted help!";
        }
        
      case "concept":
        if (lowercaseMessage.includes("calculus") || lowercaseMessage.includes("derivative") || lowercaseMessage.includes("integral")) {
          return "In calculus, a derivative measures the rate of change of a function with respect to a variable. It's represented as dy/dx or f'(x).\n\nThe basic rules are:\n- Power rule: if f(x) = xⁿ, then f'(x) = n·xⁿ⁻¹\n- Product rule: (f·g)' = f'·g + f·g'\n- Chain rule: (f(g(x)))' = f'(g(x))·g'(x)\n\nDo you want me to elaborate on any specific aspect?";
        } else if (lowercaseMessage.includes("physics") || lowercaseMessage.includes("force") || lowercaseMessage.includes("motion")) {
          return "Newton's laws of motion are fundamental in physics:\n\n1. First law (Inertia): An object remains at rest or in uniform motion unless acted upon by a force\n\n2. Second law (F=ma): Force equals mass times acceleration\n\n3. Third law: For every action, there is an equal and opposite reaction\n\nIs there a specific physics concept you'd like me to explain further?";
        } else {
          return "I'd be happy to explain concepts in any subject! To help you better understand, could you:\n\n1. Specify which concept you're learning about\n2. Tell me what you already know about it\n3. Mention what aspect is confusing you\n\nThis will help me tailor my explanation to your needs!";
        }
        
      case "exam":
        if (lowercaseMessage.includes("study") || lowercaseMessage.includes("prepare") || lowercaseMessage.includes("review")) {
          return "Here's an effective exam preparation strategy:\n\n1. Create a study schedule (allocate more time to difficult topics)\n2. Use active recall techniques instead of passive reading\n3. Practice with past papers under timed conditions\n4. Teach concepts to someone else (or pretend to)\n5. Take regular breaks using the Pomodoro technique (25 min study, 5 min break)\n\nWhat subject are you preparing for?";
        } else if (lowercaseMessage.includes("test anxiety") || lowercaseMessage.includes("nervous") || lowercaseMessage.includes("stress")) {
          return "Exam anxiety is common! Here are some techniques that can help:\n\n1. Practice deep breathing (4 seconds in, hold for 4, 4 seconds out)\n2. Visualize success and positive outcomes\n3. Prepare thoroughly but get proper sleep the night before\n4. Arrive early to settle your nerves\n5. Focus on one question at a time during the exam\n\nRemember that some anxiety is normal and can actually improve performance!";
        } else {
          return "I can help you prepare for your exams! To provide targeted assistance, I'd like to know:\n\n1. Which subject is the exam for?\n2. When is your exam scheduled?\n3. What format will it take (multiple choice, essay, problem-solving)?\n4. Which topics do you find most challenging?\n\nWith this information, I can help you create an effective study plan!";
        }
        
      default: // general
        if (lowercaseMessage.includes("calculus") || lowercaseMessage.includes("derivative")) {
          return "In calculus, a derivative measures the sensitivity to change of a function's output with respect to its input. The derivative of a function f(x) is denoted as f'(x). For example, if f(x) = x², then f'(x) = 2x.\n\nDerivatives are fundamental to understanding rates of change and optimization problems. Would you like me to explain a specific concept within calculus?";
        } else if (lowercaseMessage.includes("python") || lowercaseMessage.includes("code")) {
          return "Python is a high-level programming language known for its readability. Here's a simple example:\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"Student\"))\n```\n\nThis code defines a function that takes a name parameter and returns a greeting. Python is great for beginners because of its simple syntax and powerful libraries. What would you like to learn about Python?";
        } else if (lowercaseMessage.includes("quiz") || lowercaseMessage.includes("test")) {
          return "I can help you prepare for quizzes and tests! Would you like me to:\n\n1. Create practice questions on a specific topic?\n2. Explain quiz-taking strategies?\n3. Help you review key concepts for an upcoming test?\n4. Create a study schedule?\n\nLet me know what would be most helpful for your preparation!";
        } else {
          return "That's an interesting question! I'd be happy to help you understand this topic better. Could you provide a bit more context about:\n\n1. What subject this relates to\n2. What specific aspect you're struggling with\n3. What you already know about this topic\n\nThis will help me give you a more personalized response!";
        }
    }
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

  const setChatCategory = (newCategory: ChatCategory) => {
    setCategory(newCategory);
    toast({
      title: `Chat mode changed to ${newCategory}`,
      description: `AI responses will now focus on ${newCategory} assistance.`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Determine file type
    let fileType: "video" | "image" | "document" = "document";
    if (file.type.startsWith("video/")) {
      fileType = "video";
    } else if (file.type.startsWith("image/")) {
      fileType = "image";
    }
    
    // In a real app, you would upload to a storage service here
    // For now, we'll simulate an upload with a local URL
    setTimeout(() => {
      const fileUrl = URL.createObjectURL(file);
      
      // Add message with attachment
      const userMessage: MessageType = {
        id: Date.now().toString(),
        content: `I've uploaded a ${fileType}: ${file.name}`,
        sender: "user",
        timestamp: new Date(),
        attachment: {
          type: fileType,
          url: fileUrl,
          name: file.name
        }
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      // Add assistant response
      if (fileType === "video") {
        const assistantMessage: MessageType = {
          id: Date.now().toString() + "-response",
          content: "I've received your video. Is there anything specific you'd like me to help with regarding this content?",
          sender: "assistant",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const assistantMessage: MessageType = {
          id: Date.now().toString() + "-response",
          content: `I've received your ${fileType}. How can I help you with this?`,
          sender: "assistant",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
      
      setIsUploading(false);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      toast({
        title: "File uploaded",
        description: `Your ${fileType} has been uploaded successfully.`,
      });
    }, 1500);
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">AI Study Assistant</h2>
          <div className="flex gap-2">
            <Button 
              variant={category === "general" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChatCategory("general")}
              className="text-xs"
            >
              General
            </Button>
            <Button 
              variant={category === "homework" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChatCategory("homework")}
              className="text-xs"
            >
              Homework Help
            </Button>
            <Button 
              variant={category === "concept" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChatCategory("concept")}
              className="text-xs"
            >
              Explain Concepts
            </Button>
            <Button 
              variant={category === "exam" ? "default" : "outline"} 
              size="sm"
              onClick={() => setChatCategory("exam")}
              className="text-xs"
            >
              Exam Prep
            </Button>
          </div>
        </div>
      </div>
      
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
                    {msg.isLoading ? (
                      <div className="flex items-center space-x-2 py-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    ) : (
                      <>
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        {msg.attachment && (
                          <div className="mt-2">
                            {msg.attachment.type === "video" && (
                              <video 
                                src={msg.attachment.url} 
                                controls 
                                className="max-w-full rounded-md max-h-60 mt-2"
                              >
                                Your browser does not support the video tag.
                              </video>
                            )}
                            {msg.attachment.type === "image" && (
                              <img 
                                src={msg.attachment.url} 
                                alt={msg.attachment.name}
                                className="max-w-full rounded-md max-h-60 mt-2"
                              />
                            )}
                            {msg.attachment.type === "document" && (
                              <div className="bg-muted p-2 rounded-md mt-2 flex items-center">
                                <span className="text-sm truncate">
                                  {msg.attachment.name}
                                </span>
                                <a 
                                  href={msg.attachment.url} 
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
          </div>
        </ScrollArea>
      </div>

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
              <Calculator className="mr-1 h-3 w-3" />
              Force formula
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => handleQuickQuestion("Explain Newton's laws of motion")}
            >
              <Book className="mr-1 h-3 w-3" />
              Newton's laws
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => handleQuickQuestion("How can I solve quadratic equations?")}
            >
              <Lightbulb className="mr-1 h-3 w-3" />
              Quadratic equations
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            accept="video/*,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={triggerFileUpload}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
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
            placeholder="Ask me anything about your studies..."
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
    </div>
  );
};

export default ChatInterface;
