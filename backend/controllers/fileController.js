const File = require("../models/File");

// Function to upload a file
const uploadFile = async (req, res) => {
  try {
    const { tag } = req.body; // Extract tag from request body
    const file = req.file; // File data from multer middleware

    // Check if the file exists
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Create a new file instance
    const newFile = new File({
      filename: file.originalname, // Original name of the uploaded file
      tag,
      url: `/uploads/${file.filename}`, // URL for accessing the file
      owner: req.user.id, // User ID of the file owner
      views: 0, // Initialize view count
    });

    // Save the file instance to the database
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get user's files
const getFiles = async (req, res) => {
  try {
    const files = await File.find({ owner: req.user.id }); // Fetch files owned by the user
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to share a file
const shareFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId); // Find file by ID
    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    file.views += 1; // Increment view count
    await file.save(); // Save the updated view count

    // Construct the share link
    res.json({ success: true, shareLink: `${req.protocol}://${req.get("host")}${file.url}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get file statistics
const getFileStats = async (req, res) => {
  const { fileId } = req.params; // Get the fileId from request parameters
  try {
    const file = await File.findById(fileId); // Fetch the file by ID
    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    res.status(200).json({ success: true, views: file.views }); // Return the number of views
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching file statistics", error });
  }
};

// Export all functions
module.exports = {
  uploadFile,
  getFiles,
  shareFile,
  getFileStats,
};
