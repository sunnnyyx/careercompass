// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  DocumentData,
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Define Application interface to match the one in page.tsx
// This ensures type consistency across your application
export interface Application {
  id: string;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
}

// Reference to the 'applications' collection
const applicationsCollection = collection(db, 'applications');

/**
 * Fetches all job applications from Firestore.
 *
 * @returns {Promise<Application[]>} An array of Application objects.
 */
export const getApplicationsFromFirestore = async (): Promise<Application[]> => {
  const q = query(applicationsCollection, orderBy('date', 'desc')); // Order by date, latest first
  const querySnapshot = await getDocs(q);
  const applications: Application[] = [];
  querySnapshot.forEach((doc) => {
    // Ensure 'id' is always present and type-cast other fields
    const data = doc.data() as Omit<Application, 'id'>; // Cast to Omit<Application, 'id'> for data content
    applications.push({ id: doc.id, ...data });
  });
  return applications;
};

/**
 * Saves a new job application to Firestore.
 *
 * @param {Omit<Application, 'id'>} appData - The application data without an ID.
 * @returns {Promise<Application>} The newly saved application with its generated ID.
 */
export const saveApplicationToFirestore = async (
  appData: Omit<Application, 'id'>
): Promise<Application> => {
  const docRef = await addDoc(applicationsCollection, appData);
  return { id: docRef.id, ...appData };
};

/**
 * Deletes a job application from Firestore.
 *
 * @param {string} id - The ID of the application to delete.
 * @returns {Promise<void>}
 */
export const deleteApplicationFromFirestore = async (id: string): Promise<void> => {
  const docRef = doc(db, 'applications', id);
  await deleteDoc(docRef);
};

/**
 * Updates an existing job application in Firestore.
 *
 * @param {Application} updatedApp - The full updated application object, including its ID.
 * @returns {Promise<void>}
 */
export const updateApplicationInFirestore = async (updatedApp: Application): Promise<void> => {
  const { id, ...dataToUpdate } = updatedApp; // Destructure ID from the data
  const docRef = doc(db, 'applications', id);
  await updateDoc(docRef, dataToUpdate as DocumentData); // Cast to DocumentData for updateDoc
};