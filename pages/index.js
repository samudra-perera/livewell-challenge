import { useAuth } from "../context/auth-context";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  if (!user) return <p>Redirecting...</p>;

  return <div>Hello</div>;
}
