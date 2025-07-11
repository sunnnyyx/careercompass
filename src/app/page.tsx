"use client";

import { useState } from "react";
import AddApplicationForm from "@/components/AddApplicationForm";
import ApplicationList from "@/components/ApplicationList";

export default function HomePage() {
  const [applications, setApplications] = useState([]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Job Application Tracker
      </h1>

      <AddApplicationForm onAddApplication={(newApp) => setApplications([newApp, ...applications])} />
      <ApplicationList applications={applications} />
    </main>
  );
}
