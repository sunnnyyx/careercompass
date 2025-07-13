"use client";

import { useEffect, useState } from "react";
import AddApplicationForm from "@/components/AddApplicationForm";
import ApplicationList from "@/components/ApplicationList";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

type Application = {
  id: string;
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
  const [loading, setLoading] = useState(true);

  const collectionRef = collection(db, "applications");

 useEffect(() => {
  const fetchApplications = async () => {
    try {
      const collectionRef = collection(db, "applications"); // Move here
      const snapshot = await getDocs(collectionRef);
      const apps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Application[];
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchApplications();
}, []); 


  const handleAddApplication = async (newApp: Omit<Application, "id">) => {
    try {
      const docRef = await addDoc(collectionRef, newApp);
      const addedApp: Application = { ...newApp, id: docRef.id };
      setApplications((prev) => [addedApp, ...prev]);
    } catch (error) {
      console.error("Error adding application:", error);
    }
  };

  const handleUpdateApplication = async (updatedApp: Application) => {
    try {
      const appRef = doc(db, "applications", updatedApp.id);
      await updateDoc(appRef, updatedApp);
      setApplications((prev) =>
        prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
      );
      setEditingApp(null);
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "applications", id));
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          🎯 Job Application Tracker
        </h1>

        <div className="bg-white shadow-xl rounded-2xl p-6 mb-10">
          <AddApplicationForm
            onAddApplication={handleAddApplication}
            onUpdateApplication={handleUpdateApplication}
            editingApp={editingApp}
          />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading applications...</p>
          ) : (
            <ApplicationList
              applications={applications}
              onDelete={handleDelete}
              onEdit={setEditingApp}
            />
          )}
        </div>
      </div>
    </main>
  );
}
