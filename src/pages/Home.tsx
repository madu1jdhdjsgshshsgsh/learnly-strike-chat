import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import EnhancedRecommendations from "@/components/home/EnhancedRecommendations";
import WhatsNextFeature from "@/components/home/WhatsNextFeature";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Layout>
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to your learning dashboard</h1>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full md:w-auto mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="videos">Educational Videos</TabsTrigger>
                <TabsTrigger value="shorts">Short Lessons</TabsTrigger>
                <TabsTrigger value="exam">Exam Preparation</TabsTrigger>
                <TabsTrigger value="stem">STEM</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="arts">Arts & Humanities</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              {/* Add the "What's Next" feature */}
              <WhatsNextFeature />
              <EnhancedRecommendations />
            </TabsContent>
            
            <TabsContent value="videos">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Video content would be pulled from database */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">Understanding Advanced Mathematics</h3>
                  <p className="text-sm text-muted-foreground">45-minute comprehensive lesson</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">History of Ancient Civilizations</h3>
                  <p className="text-sm text-muted-foreground">60-minute documentary</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">Introduction to Quantum Physics</h3>
                  <p className="text-sm text-muted-foreground">30-minute lecture</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shorts">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Short lessons content */}
                <div className="border rounded-lg p-3">
                  <h3 className="font-semibold text-sm">Quick Math: Derivatives</h3>
                  <p className="text-xs text-muted-foreground">3 min</p>
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="font-semibold text-sm">5 Grammar Tips</h3>
                  <p className="text-xs text-muted-foreground">2 min</p>
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="font-semibold text-sm">Chemistry: Valence Electrons</h3>
                  <p className="text-xs text-muted-foreground">4 min</p>
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="font-semibold text-sm">World Geography: Capitals</h3>
                  <p className="text-xs text-muted-foreground">3 min</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="exam">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">SAT Preparation Course</h3>
                  <p className="text-sm text-muted-foreground">Complete preparation with practice tests</p>
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Popular</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">AP Calculus Review</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive review of all topics</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">TOEFL Language Practice</h3>
                  <p className="text-sm text-muted-foreground">Speaking and writing exercises</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Other tab contents would be similar */}
            <TabsContent value="stem">
              <p className="text-muted-foreground">STEM content will appear here</p>
            </TabsContent>
            
            <TabsContent value="languages">
              <p className="text-muted-foreground">Language learning content will appear here</p>
            </TabsContent>
            
            <TabsContent value="arts">
              <p className="text-muted-foreground">Arts & Humanities content will appear here</p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
