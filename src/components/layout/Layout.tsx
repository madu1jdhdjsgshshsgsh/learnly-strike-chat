
import React from "react";
import Navbar from "./Navbar";
import { BottomNavigation } from "./BottomNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
