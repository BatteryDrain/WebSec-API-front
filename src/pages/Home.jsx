import { useState } from "react";
import { apiFetch } from "../api/apiClient";
import { Link } from "react-router-dom";

export default function Home() {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Only image files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("File must be under 5MB.");
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      setMessage("Please select a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      setLoading(true);
      setMessage("");

      const { data } = await api.fetch("/photos", formData);

      if (!data || !data.file) {
        setMessage("Upload failed. Please try again.");
        return;
      }


      setUploadedFile(data.file);
      setMessage(data.msg);
      setPhoto(null);
      setPreview(null);

    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Upload Photo</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {preview && (
          <div style={{ margin: "1rem 0", }}>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>
        )}
<div style={{ marginTop: "1rem" }}>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        </div>
      </form>
      <div id="sign" class="row">
        <Link to="/register">signup</Link>
        <Link to="/login">login</Link>
      </div>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}

      {uploadedFile && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Uploaded Image:</h3>
          <img
            src={`/uploads/${uploadedFile}`}
            alt="Uploaded"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
}