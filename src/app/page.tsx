"use client";

import { useState } from "react";
import AddApplicationForm from "@/components/AddApplicationForm";
import ApplicationList from "@/components/ApplicationList";

type Application = {
  id: number;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
};

export default function HomePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  const handleAddApplication = (newApp: Application) => {
    setApplications([newApp, ...applications]);
  };

  const handleUpdateApplication = (updatedApp: Application) => {
    setApplications(applications.map((app) =>
      app.id === updatedApp.id ? updatedApp : app
    ));
    setEditingApp(null);
  };

  const handleDelete = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Job Application Tracker
      </h1>

      <AddApplicationForm
        onAddApplication={handleAddApplication}
        onUpdateApplication={handleUpdateApplication}
        editingApp={editingApp}
      />

      <ApplicationList
        applications={applications}
        onDelete={handleDelete}
         onEdit={setEditingApp} 
      />
    </main>
  );
}
