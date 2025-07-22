// page.tsx
'use client';

import { useEffect, useState } from 'react';
import AddApplicationForm from '../components/AddApplicationForm';
import ApplicationList from '../components/ApplicationList';
import { // Ensure Application interface is imported if not defined directly in page.tsx
  getApplicationsFromFirestore,
  saveApplicationToFirestore,
  deleteApplicationFromFirestore,
  updateApplicationInFirestore,
  Application // <-- Make sure Application is imported from firebase.ts
} from '../lib/firebase';


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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 px-4 py-12 font-sans relative overflow-hidden">
      {/* Background blobs/shapes for aesthetic (optional but cool) */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>


      <div className="max-w-5xl mx-auto text-center mb-12 relative z-10"> {/* Added relative z-10 to ensure content is above blobs */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-fade-in drop-shadow-lg leading-tight"> {/* Stronger gradient, larger, leading-tight for better line spacing */}
          Career Compass <span className="text-3xl">🧭</span>
        </h1>
        <p className="mt-3 text-gray-700 text-lg animate-fade-up">Track, Manage & Conquer your job hunt with clarity and ease.</p> {/* Larger text, slightly darker color */}
      </div>

      <div className="bg-white/85 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto animate-fade-up border border-gray-100 relative z-10 transform hover:scale-[1.005] transition-transform duration-300 ease-in-out"> {/* More blur, rounded-3xl, stronger shadow, subtle hover effect */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Job Application</h2>
        <AddApplicationForm
          onAdd={handleAdd}
          onEditSubmit={handleEdit}
          editApp={editApp}
          clearEdit={() => setEditApp(null)}
        />
      </div>

      <div className="mt-16 relative z-10"> {/* More top margin, z-10 */}
        <ApplicationList
          applications={applications}
          onDelete={handleDelete}
          onEdit={(app) => setEditApp(app)}
        />
      </div>
    </main>
  );
}