import { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const userData = {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    userId: localStorage.getItem("userId"),
  };

  const isAuthorized = useMemo(() => {
    const hasToken = !!userData.token;
    const isUser = userData.role?.toLowerCase() === "user";
    return hasToken && isUser;
  }, [userData.token, userData.role]);

  useEffect(() => {
    if (!isAuthorized) {
      // Auto-redirect to login if check fails
      const timeout = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthorized, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 3. Proper Loading State
  if (isAuthorized === null) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Verifying session...</p>
      </div>
    );
  }

  // 4. Denied State
  if (!isAuthorized) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#d9534f" }}>
        <h2>🔒 Access Denied</h2>
        <p>Redirecting to login...</p>
        <Link to="/login" style={{ fontWeight: "bold" }}>Manual Login</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: "8px 16px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Logout
        </button>
      </header>

      <section style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#f9f9f9", borderRadius: "8px", border: "1px solid #ddd" }}>
        <h3>Welcome back, {userData.username || "User"}!</h3>
        <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666", lineHeight: "1.6" }}>
          <p><strong>User ID:</strong> {userData.userId}</p>
          <p><strong>Username:</strong> <span style={{ color: "#28a745" }}>{userData.username}</span></p>
          <p><strong>Email:</strong> <span style={{ color: "#28a745" }}>{userData.email}</span></p>
          <p><strong>Role:</strong> <span style={{ color: "#28a745" }}>{userData.role}</span></p>
        </div>
      </section>

      <div style={{ marginTop: "2rem", color: "black", padding: "1rem", background: "#eee", borderRadius: "4px", overflowX: "auto" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>Debug - Active Token:</p>
        <code style={{ fontSize: "0.7rem", wordBreak: "break-all" }}>{userData.token}</code>
      </div>
    </div>
  );
}