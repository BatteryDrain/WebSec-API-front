"use client";
import { useState } from "react";

const initialState = {
  email: "",
  username: "",
  bio: "",
};

export default function ProfileForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState(null);

  const showBanner = (msg, type) => {
    setBanner({ msg, type });
    setTimeout(() => setBanner(null), 4000);
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
    if (!/^[a-zA-Z0-9\s.,!?'-]*$/.test(form.bio)) {
      errs.bio = "Bio contains invalid characters.";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors({});
    showBanner("Fields cleared.", "info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showBanner("Profile updated successfully.", "success");
      setErrors({});
    } catch (err) {
      console.error(err);
      showBanner("Something went wrong.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const bannerStyles = {
    success: { background: "#ecfdf5", color: "#065f46", border: "0.5px solid #6ee7b7" },
    danger:  { background: "#fef2f2", color: "#991b1b", border: "0.5px solid #fca5a5" },
    warning: { background: "#fffbeb", color: "#92400e", border: "0.5px solid #fcd34d" },
    info:    { background: "#f9fafb", color: "#374151", border: "0.5px solid #e5e7eb" },
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 500,
    color: "#6b7280",
    marginBottom: "6px",
    letterSpacing: "0.03em",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px 10px",
    fontSize: "14px",
    border: "0.5px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    background: "#fff",
    color: "#111827",
  };

  const errorStyle = {
    fontSize: "12px",
    color: "#dc2626",
    margin: "4px 0 0",
  };

  return (
    <div style={{ maxWidth: "560px", margin: "1.5rem auto", padding: "0 1rem" }}>

      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 500 }}>
          Account settings
        </p>
        <h2 style={{ fontSize: "22px", fontWeight: 500, margin: "4px 0 0", color: "#111827" }}>
          Update your info
        </h2>
      </div>

      {banner && (
        <div style={{ ...bannerStyles[banner.type], padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "1rem" }}>
          {banner.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-labelledby="profile-heading">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Email */}
          <div>
            <label htmlFor="email" style={labelStyle}>Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              style={inputStyle}
            />
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: "5px 0 0" }}>
              Changing your email will require re-verification.
            </p>
            {errors.email && <p id="email-error" style={errorStyle}>{errors.email}</p>}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "#9ca3af", pointerEvents: "none" }}>@</span>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="janedoe"
                value={form.username}
                onChange={handleChange}
                style={{ ...inputStyle, paddingLeft: "26px" }}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" style={labelStyle}>Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="Tell us a little about yourself..."
              value={form.bio}
              onChange={handleChange}
              maxLength={500}
              aria-invalid={!!errors.bio}
              aria-describedby="bio-error"
              style={{ ...inputStyle, resize: "vertical", minHeight: "72px" }}
            />
            {errors.bio && <p id="bio-error" style={errorStyle}>{errors.bio}</p>}
          </div>

          {/* Actions */}
          <div style={{ borderTop: "0.5px solid #e5e7eb", paddingTop: "16px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              type="button"
              onClick={handleReset}
              style={{ fontSize: "13px", padding: "8px 16px", border: "0.5px solid #d1d5db", borderRadius: "8px", background: "transparent", cursor: "pointer", color: "#374151" }}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ fontSize: "13px", padding: "8px 16px", border: "0.5px solid #111827", borderRadius: "8px", background: "#111827", color: "#fff", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}