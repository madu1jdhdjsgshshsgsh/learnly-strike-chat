
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SettingsForm } from "@/components/settings/SettingsForm";

const Settings = () => {
  // For demo purposes, we're setting a role. In a real app, this would come from auth
  const [userRole] = useState<"student" | "teacher">("student");
  
  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <SettingsForm userRole={userRole} />
      </div>
    </Layout>
  );
};

export default Settings;
