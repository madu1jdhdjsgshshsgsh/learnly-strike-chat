
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SettingsForm } from "@/components/settings/SettingsForm";

const Settings = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <SettingsForm />
      </div>
    </Layout>
  );
};

export default Settings;
