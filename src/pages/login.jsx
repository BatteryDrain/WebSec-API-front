import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/apiClient";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = "https://localhost:3001/api/v1/auth/google";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setMessage("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await apiFetch({
        method: "POST",
        url: "/login",
        data: form,
      });

      if (!res.token) {
        setMessage("Login failed. No token received.");
        return;
      }

      // 🔐 ONLY STORE TOKEN
      localStorage.setItem("token", res.token);

      setMessage(res.message || "Login successful");

      // 🚀 Redirect immediately
      const role = res.user?.role?.toLowerCase();

      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setMessage(err.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" onClick={handleGoogleLogin} style={{ marginLeft: "1rem" }}>
          Login with Google
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}