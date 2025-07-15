'use client';

import { useEffect, useState } from 'react';
import AddApplicationForm from '../components/AddApplicationForm';
import ApplicationList from '../components/ApplicationList';
import {
  getApplicationsFromFirestore,
  saveApplicationToFirestore,
  deleteApplicationFromFirestore,
  updateApplicationInFirestore,
} from '../lib/firebase';

export interface Application {
  id: string;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [editApp, setEditApp] = useState<Application | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      const apps = await getApplicationsFromFirestore();
      setApplications(apps);
    };
    fetchApps();
  }, []);

  const handleAdd = async (app: Omit<Application, 'id'>) => {
    const newApp = await saveApplicationToFirestore(app);
    setApplications((prev) => [...prev, newApp]);
  };

  const handleDelete = async (id: string) => {
    await deleteApplicationFromFirestore(id);
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const handleEdit = async (updatedApp: Application) => {
    await updateApplicationInFirestore(updatedApp);
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    );
    setEditApp(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 px-4 py-12">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-fade-in">
          Career Compass <span className="text-2xl">🧭</span>
        </h1>
        <p className="mt-2 text-gray-600">Track, Manage & Conquer your job hunt</p>
      </div>

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-4xl mx-auto animate-fade-up border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Job Application</h2>
        <AddApplicationForm
          onAdd={handleAdd}
          onEditSubmit={handleEdit}
          editApp={editApp}
          clearEdit={() => setEditApp(null)}
        />
      </div>

      <div className="mt-12">
        <ApplicationList
          applications={applications}
          onDelete={handleDelete}
          onEdit={(app) => setEditApp(app)}
        />
      </div>
    </main>
  );
}
