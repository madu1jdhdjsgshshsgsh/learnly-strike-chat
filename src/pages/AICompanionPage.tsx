
import Navbar from "@/components/layout/Navbar";
import AICompanion from "@/components/ai-companion/AICompanion";

const AICompanionPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AICompanion />
      </main>
    </div>
  );
};

export default AICompanionPage;
