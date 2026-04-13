"use client";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../api/apiClient";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchUser = async () => {
    try {
      const data = await apiFetch({
        url: "/session",
        method: "GET",
      });

      setUser(data.user);
      setError(null);
    } catch (err) {
      console.error("Auth failed:", err.message);
      setUser(null);
      setError("Session expired");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => navigate("/login"), 500);
      return () => clearTimeout(timer);
    }
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    try {
      await apiFetch({
        url: "/logout",
        method: "POST",
      });
    } catch {
      console.warn("Backend logout failed, clearing local session");
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      navigate("/login");
    }
  };


  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Verifying session...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#d9534f" }}>
        <h2>Session Error</h2>
        <p>{error}</p>
        <Link to="/login">Login again</Link>
      </div>
    );
  }


  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#d9534f" }}>
        <h2>🔒 Access Denied</h2>
        <p>Redirecting to login...</p>
      </div>
    );
  }


  const isUser = user.role?.toLowerCase() === "user";

  if (!isUser) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#d9534f" }}>
        <h2>🚫 Access Denied</h2>
        <p>Insufficient permissions</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>

      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>


      <section
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "#ccc",
          borderRadius: "8px",
          border: "1px solid #bbb",
        }}
      >
        <h3>Welcome back, {user.username || "User"}!</h3>

        <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>

          <p>
            <strong>Bio:</strong>{" "}
            {user.bio ? user.bio : <em>No bio set</em>}
          </p>

          <Link to="/profile" style={{ color: "#007bff" }}>
            Edit Profile
          </Link>
        </div>
      </section>
    </div>
  );
}