"use client";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  bio: "",
};

export default function ProfileForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const validate = () => {
    const errs = {};

    // Name: 3–50 alphabetic characters
    if (!/^[A-Za-z\s]{3,50}$/.test(form.name.trim())) {
      errs.name = "Name must be 3–50 alphabetic characters.";
    }

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email format.";
    }

    // Bio
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

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Profile updated successfully!");
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="profile-heading">
      <h2 id="profile-heading">Update Profile</h2>

      {/* Name */}
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        aria-invalid={!!errors.name}
        aria-describedby="name-error"
        required
      />
      {errors.name && <p id="name-error">{errors.name}</p>}

      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        aria-invalid={!!errors.email}
        aria-describedby="email-error"
        required
      />
      {errors.email && <p id="email-error">{errors.email}</p>}

      {/* Bio */}
      <label htmlFor="bio">Bio</label>
      <textarea
        id="bio"
        name="bio"
        value={form.bio}
        onChange={handleChange}
        maxLength={500}
        aria-invalid={!!errors.bio}
        aria-describedby="bio-error"
      />
      {errors.bio && <p id="bio-error">{errors.bio}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}