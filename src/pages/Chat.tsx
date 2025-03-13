
import Navbar from "@/components/layout/Navbar";
import ChatInterface from "@/components/chat/ChatInterface";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Chat;
