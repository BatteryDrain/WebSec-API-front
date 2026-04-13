"use client";
import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "../api/apiClient";


const initialState = {
  email: "",
  username: "",
  bio: "",
};

export default function ProfileForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const data = await apiFetch({
        url: "/session",
        method: "GET",
      });

      setForm({
        email: data.user.email || "",
        username: data.user.username || "",
        bio: data.user.bio || "",
      });

      setErrors({});
    } catch (err) {
      console.error(err.message);
      setBanner({ msg: "Session expired. Please login again.", type: "danger" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);


  const showBanner = useCallback((msg, type = "info") => {
    setBanner({ msg, type });
    setTimeout(() => setBanner(null), 3000);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = () => {
    fetchProfile();
    setErrors({});
    showBanner("Reset successful", "info");
  };


  const validate = () => {
    const errs = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email format.";
    }

    if (form.bio.length > 500) {
      errs.bio = "Bio must be under 500 characters.";
    }

    if (/<[^>]*>?/.test(form.bio)) {
      errs.bio = "HTML tags are not allowed.";
    }

    return errs;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      setSaving(true);

      await apiFetch({
        url: "/user/profile",
        method: "PATCH",
        data: form,
      });

      showBanner("Profile updated successfully", "success");
      setErrors({});
    } catch (err) {
      showBanner(err.message || "Update failed", "danger");
    } finally {
      setSaving(false);
    }
  };

  // -------------------------
  // LOADING
  // -------------------------
  if (loading) {
    return (

        <div style={{ padding: "2rem", textAlign: "center" }}>
          Loading profile...
        </div>

    );
  }

  // -------------------------
  // STYLES
  // -------------------------
  const bannerStyles = {
    success: { background: "#ecfdf5", color: "#065f46" },
    danger: { background: "#fef2f2", color: "#991b1b" },
    warning: { background: "#fffbeb", color: "#92400e" },
    info: { background: "#f9fafb", color: "#374151" },
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 500,
    color: "#fff",
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "#fff",
    color: "#111827",
  };

  const errorStyle = {
    fontSize: "12px",
    color: "#dc2626",
    marginTop: "4px",
  };

  // -------------------------
  // UI
  // -------------------------
  return (
  
      <div style={{ maxWidth: "560px", margin: "1.5rem auto", padding: "0 1rem" }}>

        <h2 style={{ color: "#fff" }}>Update Profile</h2>

        {banner && (
          <div
            style={{
              ...bannerStyles[banner.type],
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "1rem",
            }}
          >
            {banner.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <label style={labelStyle}>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}

          {/* USERNAME */}
          <label style={labelStyle}>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            style={inputStyle}
          />

          {/* BIO */}
          <label style={labelStyle}>Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.bio && <p style={errorStyle}>{errors.bio}</p>}

          {/* ACTIONS */}
          <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
            <button type="button" onClick={handleReset}>
              Reset
            </button>

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
 
  );
}