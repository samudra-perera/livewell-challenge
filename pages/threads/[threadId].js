// pages/threads/[threadId].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../utils/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../../context/auth-context";

export default function Thread() {
  const { user } = useAuth();
  const router = useRouter();
  const { threadId } = router.query;
  const [thread, setThread] = useState(null);
  const [message, setMessage] = useState("");

  console.log(user);

  useEffect(() => {
    const fetchThread = async () => {
      if (threadId) {
        const docRef = doc(db, "threads", threadId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setThread({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchThread();
  }, [threadId]);

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    const newMessage = {
      text: message,
      createdAt: new Date().toISOString(),
      userEmail: user.email,
      userRole: user.role,
    };

    try {
      const threadRef = doc(db, "threads", threadId);
      await updateDoc(threadRef, {
        messages: arrayUnion(newMessage),
      });

      setThread((prevThread) => ({
        ...prevThread,
        messages: [...(prevThread.messages || []), newMessage],
      }));

      setMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Thread: {thread?.title}</h1>
      <ul>
        {thread?.messages?.map((msg, index) => (
          <li key={index}>
            {msg.text} <br />
            <small>
              Posted by: {msg.userEmail} ({msg.userRole})
            </small>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message"
          required
        />
        <button type="submit">Add Message</button>
      </form>
    </div>
  );
}
