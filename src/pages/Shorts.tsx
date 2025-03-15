
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ShortsPlayer } from "@/components/shorts/ShortsPlayer";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

const Shorts = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-128px)] overflow-hidden">
        <ShortsPlayer />
      </div>
      <BottomNavigation />
    </Layout>
  );
};

export default Shorts;
