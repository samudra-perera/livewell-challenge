// pages/index.js
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import Link from "next/link";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/router";

export default function Home() {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const { logout, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchThreads = async () => {
      const querySnapshot = await getDocs(collection(db, "threads"));
      setThreads(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchThreads();
  }, []);

  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const docRef = await addDoc(collection(db, "threads"), {
        title: title,
        createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      fetchThreads();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Create New Thread</h1>
      <form onSubmit={handleCreateThread}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thread Title"
          required
        />
        <button type="submit">Create Thread</button>
      </form>
      {user && (
        <button onClick={handleLogout}>Logout</button> // Conditionally render logout button based on user state
      )}
      <h2>Available Threads</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <Link href={`/threads/${thread.id}`}>{thread.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
