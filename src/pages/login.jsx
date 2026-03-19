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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        url: "/auth/login",
        data: form,
      });

      if (!res.token) {
        setMessage("Login failed. No token received.");
        return;
      }

      if (res.token) {
        localStorage.setItem("token", res.token);
        console.log("Token saved:", res.token);

        setMessage(res.msg || "Login successful");

       navigate("/dashboard");
      } else {
        setMessage("Invalid login response. Please try again.");
      }

    } catch (err) {
      setMessage(err.data?.msg || "Login failed");
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
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}