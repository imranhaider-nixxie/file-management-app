import React, { useEffect, useState } from "react";
import api from "../api"; // Import your API configuration

function FileList() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/files", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(response.data.files);
    } catch (error) {
      console.error("Failed to fetch files", error);
      setError("Failed to fetch files. Please try again.");
    }
  };

  const handleShareLink = async (fileId) => {
    try {
      const response = await api.get(`/files/share/${fileId}`);
      const shareLink = response.data.shareLink;
      navigator.clipboard.writeText(shareLink);
      alert("Share link copied to clipboard!");
    } catch (error) {
      console.error("Failed to generate share link", error);
      setError("Failed to generate share link.");
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <p><strong>File:</strong> {file.filename}</p>
            <p><strong>Tag:</strong> {file.tag}</p>
            <p><strong>Views:</strong> {file.viewCount}</p>
            <button onClick={() => handleShareLink(file._id)}>Share Link</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
