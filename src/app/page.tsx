"use client";

import { useEffect, useState } from "react";
import AddApplicationForm from "@/components/AddApplicationForm";
import ApplicationList from "@/components/ApplicationList";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

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

  // 🔁 Fetch from Firestore on page load
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const snapshot = await getDocs(collection(db, "applications"));
        const apps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Application[];
        setApplications(apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // ➕ Add new app to Firestore
  const handleAddApplication = async (newApp: Omit<Application, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "applications"), newApp);
      const addedApp: Application = { ...newApp, id: docRef.id };
      setApplications((prev) => [addedApp, ...prev]);
    } catch (error) {
      console.error("Error adding application:", error);
    }
  };

  // ✏️ Update app in Firestore
  const handleUpdateApplication = async (updatedApp: Application) => {
    try {
      const docRef = doc(db, "applications", updatedApp.id);
      await updateDoc(docRef, updatedApp);
      setApplications((prev) =>
        prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
      );
      setEditingApp(null);
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  // ❌ Delete app from Firestore
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "applications", id));
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
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
