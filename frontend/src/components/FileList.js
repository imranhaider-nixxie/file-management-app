import React from "react"; // No need for useState since it's not being used
import api from "../api"; // Import your API configuration

function FileList({ files }) { // Accept files as props
  const [error, setError] = React.useState(""); // You still need to manage error for sharing links

 const handleShareLink = async (fileId) => {
    try {
        const response = await api.get(`/files/share/${fileId}`);
        const shareLink = response.data.shareLink;

        // Check if the Clipboard API is available
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareLink);
            alert("Share link copied to clipboard!");
        } else {
            // Fallback for older browsers
            const tempInput = document.createElement("input");
            tempInput.value = shareLink;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            alert("Share link copied to clipboard (fallback)!");
        }
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
