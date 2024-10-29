import React, { useState } from "react";
import api from "../api"; // Import your API configuration

function FileUpload({ onFileUpload }) {
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type.startsWith("image/") || selectedFile.type.startsWith("video/"))) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please upload an image or video file.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !tag) {
      setError("File and tag are required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tag", tag);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      onFileUpload(response.data); // Trigger callback with uploaded file data
      setFile(null);
      setTag("");
    } catch (error) {
      console.error("File upload failed", error);
      setError("File upload failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
