import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    localStorage.setItem("token", token);
    localStorage.setItem("role", payload.role);
    localStorage.setItem("userId", payload.id);

    if (payload.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  return <p>Signing you in with Google...</p>;
}