"use client";

import { useState } from "react";
import AddApplicationForm from "@/components/AddApplicationForm";
import ApplicationList from "@/components/ApplicationList";

// Define the Application type
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
  // Use Application[] as the state type
  const [applications, setApplications] = useState<Application[]>([]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Job Application Tracker
      </h1>

      <AddApplicationForm
        onAddApplication={(newApp: Application) =>
          setApplications([newApp, ...applications])
        }
      />

      <ApplicationList applications={applications} />
    </main>
  );
}
