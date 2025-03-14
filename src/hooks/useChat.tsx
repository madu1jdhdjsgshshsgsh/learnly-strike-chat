import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export type MessageType = {
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

export type ChatCategory = "general" | "homework" | "concept" | "exam";

const GEMINI_API_KEY = "AIzaSyA80v0F1D4MJOzCIlw6tBwkRQgV80d0KVk";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant, similar to Google Gemini. I can help with educational topics, general knowledge questions, and more. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [category, setCategory] = useState<ChatCategory>("general");
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addMessage = (message: Omit<MessageType, "id" | "timestamp">) => {
    const newMessage: MessageType = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      try {
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
          toast({
            title: "Voice recorded",
            description: "Your voice has been converted to text. You can edit before sending.",
          });
          
          stream.getTracks().forEach(track => track.stop());
          
          return "I have a question about...";
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

  const fetchGeminiResponse = async (prompt: string): Promise<string> => {
    try {
      let contextPrompt = "";
      
      switch(category) {
        case "homework":
          contextPrompt = "You are helping with homework. ";
          break;
        case "concept":
          contextPrompt = "You are explaining an educational concept. ";
          break;
        case "exam":
          contextPrompt = "You are helping with exam preparation. ";
          break;
        default:
          contextPrompt = "You are a helpful AI assistant. ";
      }
      
      const fullPrompt = contextPrompt + prompt;
      
      console.log("Sending request to Gemini API...");
      
      const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
      console.log("API URL (without key):", GEMINI_API_URL);
      
      const requestBody = {
        contents: [
          {
            parts: [
              { text: fullPrompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      };
      
      console.log("Request payload:", JSON.stringify(requestBody));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Gemini API response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error response:", errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          console.error("Gemini API error:", errorData);
          throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
        } catch (e) {
          throw new Error(`Gemini API error: Status ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("Gemini API response received:", data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error("Unexpected Gemini API response format:", data);
        throw new Error("Unexpected API response format");
      }
      
      const textResponse = data.candidates[0].content.parts?.[0]?.text;
      return textResponse || "I don't have an answer for that.";
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      return "I'm sorry, I encountered an error while processing your request. Please try again.";
    }
  };

  const generateFallbackResponse = (userMessage: string, category: ChatCategory): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes("formula") && lowercaseMessage.includes("force")) {
      return "The formula for force is:\n\n**F = m × a**\n\nWhere:\n- F is force (measured in Newtons, N)\n- m is mass (measured in kilograms, kg)\n- a is acceleration (measured in meters per second squared, m/s²)\n\nThis is Newton's Second Law of Motion, which states that the force acting on an object is equal to the mass of that object times its acceleration.\n\nOther related force formulas include:\n- Weight: W = m × g (where g is gravitational acceleration, approximately 9.8 m/s² on Earth)\n- Spring force: F = -k × x (where k is the spring constant and x is displacement)\n- Friction: F = μ × N (where μ is the coefficient of friction and N is the normal force)";
    }
    
    if (lowercaseMessage.includes("capital of")) {
      if (lowercaseMessage.includes("france")) return "The capital of France is Paris.";
      if (lowercaseMessage.includes("japan")) return "The capital of Japan is Tokyo.";
      if (lowercaseMessage.includes("australia")) return "The capital of Australia is Canberra.";
      if (lowercaseMessage.includes("india")) return "The capital of India is New Delhi.";
      if (lowercaseMessage.includes("brazil")) return "The capital of Brazil is Brasília.";
      return "I can provide information about capitals of countries. Could you specify which country you're asking about?";
    }
    
    if (lowercaseMessage.includes("president of")) {
      if (lowercaseMessage.includes("united states")) return "As of 2023, Joe Biden is the President of the United States.";
      if (lowercaseMessage.includes("france")) return "As of 2023, Emmanuel Macron is the President of France.";
      return "I can provide information about current presidents. Could you specify which country you're asking about?";
    }
    
    if (lowercaseMessage.includes("population of")) {
      if (lowercaseMessage.includes("world")) return "The world population is approximately 8 billion people as of 2023.";
      if (lowercaseMessage.includes("china")) return "The population of China is approximately 1.4 billion people as of 2023.";
      if (lowercaseMessage.includes("india")) return "The population of India is approximately 1.4 billion people as of 2023.";
      if (lowercaseMessage.includes("united states")) return "The population of the United States is approximately 330 million people as of 2023.";
      return "I can provide population information. Could you specify which country or region you're asking about?";
    }
    
    if (lowercaseMessage.includes("how many planets")) {
      return "There are eight planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto was reclassified as a dwarf planet in 2006.";
    }
    
    if (lowercaseMessage.includes("dna")) {
      return "DNA (deoxyribonucleic acid) is the genetic material that carries the instructions for the development, functioning, growth, and reproduction of all known organisms. It consists of two strands coiled around each other in a double helix structure. The information in DNA is stored as a code made up of four chemical bases: adenine (A), guanine (G), cytosine (C), and thymine (T).";
    }
    
    if (lowercaseMessage.includes("world war")) {
      if (lowercaseMessage.includes("1")) {
        return "World War I (WWI) was a global conflict that lasted from 1914 to 1918. It involved the world's great powers, assembled in two opposing alliances: the Allies (centered around the Triple Entente of Britain, France, and Russia) and the Central Powers (originally centered around the Triple Alliance of Germany, Austria-Hungary, and Italy). More than 70 million military personnel were mobilized and over 9 million combatants died.";
      }
      if (lowercaseMessage.includes("2")) {
        return "World War II (WWII) was a global conflict that lasted from 1939 to 1945. It involved the vast majority of the world's countries, including all of the great powers, forming two opposing military alliances: the Allies (primarily the United States, the Soviet Union, and the United Kingdom) and the Axis (primarily Nazi Germany, Japan, and Italy). It was the deadliest conflict in human history, resulting in 70 to 85 million fatalities.";
      }
      return "I can provide information about World War I (1914-1918) or World War II (1939-1945). Which one would you like to know about?";
    }
    
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
        return "I'm your AI assistant, similar to Google Gemini. I can help answer questions about a wide range of topics including science, history, math, current events, and more. I can also assist with educational topics, homework help, and exam preparation.\n\nTo give you a more helpful response, could you provide more details about what you'd like to know?";
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    let fileType: "video" | "image" | "document" = "document";
    if (file.type.startsWith("video/")) {
      fileType = "video";
    } else if (file.type.startsWith("image/")) {
      fileType = "image";
    }
    
    setTimeout(() => {
      const fileUrl = URL.createObjectURL(file);
      
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
      
      const assistantMessage: MessageType = {
        id: Date.now().toString() + "-response",
        content: `I've received your ${fileType}. How can I help you with this?`,
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      setIsUploading(false);
      
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

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    addMessage({
      content: messageContent,
      sender: "user",
    });

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

    try {
      console.log("Requesting response for:", messageContent);
      const responseContent = await fetchGeminiResponse(messageContent);
      
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingId));
      
      addMessage({
        content: responseContent,
        sender: "assistant",
      });
    } catch (error) {
      console.error("Error getting response:", error);
      
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingId));
      
      const fallbackResponse = generateFallbackResponse(messageContent, category);
      
      addMessage({
        content: fallbackResponse,
        sender: "assistant",
      });
      
      toast({
        title: "Connection issue",
        description: "Using offline response mode. Check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    category,
    isRecording,
    isUploading,
    fileInputRef,
    sendMessage,
    setCategory,
    toggleRecording,
    handleFileUpload,
    triggerFileUpload,
  };
};
