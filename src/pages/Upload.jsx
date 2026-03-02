import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    setImageUrl(`http://localhost:3000/uploads/${data.filename}`);
  };

  return (
    <div>
      <h2>Upload Image</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} width="300" />
        </div>
      )}
    </div>
  );
}

export default Upload;
