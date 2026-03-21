import { useEffect, useState } from "react";
import { apiFetch } from "../api/apiClient";
import { Logout } from "../components/logout";

export default function Admin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    setIsAuthorized(!!token && role === "admin");


    const fetchAdminData = async () => {
      try {
        const res = await apiFetch({ url: "/auth/admin" });
        setData(res);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    Logout();
  };

  if (isAuthorized === null) return <p>Loading...</p>;

  if (!isAuthorized || !data) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Access Denied</h2>
        <p>
          You must be logged in to view this page. Please{" "}
          <a href="/login">log in</a>.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading admin data...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Admin Data:</h4>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}