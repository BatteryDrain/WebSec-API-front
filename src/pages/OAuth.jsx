import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      navigate("/login?error=no_token");
      return;
    }

    try {
      // ✅ Store ONLY token
      localStorage.setItem("token", token);

      // 🔥 Let backend handle identity
      const userRole = "user"; // fallback until /me loads

      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("OAuth error:", err);
      navigate("/login?error=invalid_auth");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div className="spinner" />
      <p>Finalizing login...</p>
    </div>
  );
}