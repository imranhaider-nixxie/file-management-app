import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import api from "../api";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await api.get("/files");
      setFiles(response.data.files);
      setSuccessMessage(""); // Clear success message on refresh
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  const handleFileUpload = (newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
    setSuccessMessage("File uploaded successfully!"); // Set success message
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {/* Pass fetchFiles to FileUpload */}
      <FileUpload onFileUpload={handleFileUpload} fetchFiles={fetchFiles} />
      <FileList files={files} />
    </div>
  );
}

export default Dashboard;
