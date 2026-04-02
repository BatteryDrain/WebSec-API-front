import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 

  useEffect(() => {
   
    const token = searchParams.get("token") || new URLSearchParams(window.location.search).get("token");

    if (!token) {
      console.error("URL detected:", window.location.href); 
      navigate("/login?error=no_token");
      return;
    }

    try {

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      
      const payload = JSON.parse(jsonPayload);

      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("role", payload.role || "user");
      localStorage.setItem("userId", payload.id);
      localStorage.setItem("username", payload.username || "Guest");
      localStorage.setItem("email", payload.email || "");


      const userRole = (payload.role || "").toLowerCase();

      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "user") {
        navigate("/dashboard");
      } else {
        console.warn("Unknown role detected:", userRole);
        navigate("/");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      navigate("/login?error=invalid_auth");
    }
  }, [navigate, searchParams]);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      marginTop: "100px",
      fontFamily: "sans-serif" 
    }}>
      <div className="spinner" style={{ 
        border: "4px solid #f3f3f3", 
        borderTop: "4px solid #3498db", 
        borderRadius: "50%", 
        width: "40px", 
        height: "40px", 
        animation: "spin 1s linear infinite" 
      }} />
      <p style={{ marginTop: "20px", color: "#555" }}>
        Finalizing your secure login...
      </p>
      
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}