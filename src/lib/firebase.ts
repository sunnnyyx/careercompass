import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzboK2dOsQRQLVkfB3wj34TPwLDkOtbS8",
  authDomain: "careercompass-408a0.firebaseapp.com",
  projectId: "careercompass-408a0",
  storageBucket: "careercompass-408a0.appspot.com",
  messagingSenderId: "26204918534",
  appId: "1:26204918534:web:d301049fa606ea9fb20487",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Firestore collection name
const COLLECTION_NAME = "applications";

// TypeScript type
export interface Application {
  id?: string;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
}

// Get all applications
export const getApplicationsFromFirestore = async (): Promise<Application[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Application[];
};

// Save a new application
export const saveApplicationToFirestore = async (
  app: Omit<Application, "id">
): Promise<Application> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), app);
  return { id: docRef.id, ...app };
};

// Delete an application
export const deleteApplicationFromFirestore = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

// Update an application
export const updateApplicationInFirestore = async (app: Application): Promise<void> => {
  if (!app.id) return;
  const { id, ...data } = app;
  await updateDoc(doc(db, COLLECTION_NAME, id), data);
};
