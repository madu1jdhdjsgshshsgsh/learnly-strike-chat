
import Navbar from "@/components/layout/Navbar";
import RecommendedVideos from "@/components/home/RecommendedVideos";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Recommended for you</h1>
        <RecommendedVideos />
      </main>
    </div>
  );
};

export default Home;
