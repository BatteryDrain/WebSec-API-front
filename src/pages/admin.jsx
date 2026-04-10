import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/apiClient";
import { Logout } from "../components/logout";

export default function Admin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get values from storage FIRST
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    // 2. Perform normalized check
    const isAdmin = !!token && storedRole?.toLowerCase() === "admin";
    
    // Update state so the UI knows where we stand
    setIsAuthorized(isAdmin);

    // 3. Security Guard: If not an admin, stop here
    if (!isAdmin) {
      setLoading(false);
      return; 
    }

    const fetchAdminData = async () => {
      try {
        // 4. Server-side check: This verifies the JWT actually has admin rights
        const res = await apiFetch({ url: "/admin" });
        setData(res);
      } catch (err) {
        console.error("Admin Fetch Error:", err);
        setError(err.message || "Unauthorized access to admin API");
        
        // If the token is expired or invalid on the server
        if (err.status === 401 || err.status === 403) {
          setIsAuthorized(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  // UI STATE 1: Verifying session
  if (isAuthorized === null || (isAuthorized && loading)) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Verifying Admin Credentials...</p>
      </div>
    );
  }

  // UI STATE 2: Access Blocked
  if (!isAuthorized) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#d9534f" }}>
        <h2>🚫 Restricted Area</h2>
        <p>Administrative privileges required.</p>
        <button onClick={() => navigate("/login")} style={{ marginTop: "1rem" }}>
          Return to Login
        </button>
      </div>
    );
  }

  // UI STATE 3: Success
  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #eee", paddingBottom: "1rem" }}>
        <h2>Admin Dashboard</h2>
        <button 
          onClick={handleLogout}
          style={{ backgroundColor: "#333", color: "white", border: "none", padding: "8px 15px", cursor: "pointer" }}
        >
          Logout
        </button>
      </header>

      {error && (
        <div style={{ backgroundColor: "#ffebeb", color: "#b71c1c", padding: "1rem", marginTop: "1rem", borderRadius: "4px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h4 style={{ color: "#555" }}> Admin Data:</h4>
        <div style={{ background: "#f4f4f4", padding: "1.5rem", borderRadius: "8px", border: "1px solid #ccc" }}>
          {data ? (
            
            <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#777" }}>
              userId: {localStorage.getItem("role")} | username: {localStorage.getItem("username")} | email: {localStorage.getItem("email")}
            </p>
          ) : (
            <p>No admin records found.</p>
          )}
        </div>
      </div>
    </div>
  );
}