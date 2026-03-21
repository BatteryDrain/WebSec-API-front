import { useEffect, useState } from "react";
import { Logout } from "../components/logout";

export default function Dashboard() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuthorization  = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      setIsAuthorized(!!token && role === "user");
    };

    checkAuthorization();
  }, []);
  const handleLogout = () => {
    Logout();

  };

  if (isAuthorized === null) return <p>Loading...</p>;

  if (!isAuthorized) {
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
      <h2>Dashboard</h2>
      <p>
        Welcome to your dashboard! Here you can manage your account and view your
        activity.
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}