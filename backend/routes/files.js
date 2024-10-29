const express = require('express');
const router = express.Router();
const File = require('../models/File'); // Adjust the path based on your project structure

// Other route handlers...

// Share link route
router.get('/share/:fileId', async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Logic to generate the share link (you can customize this)
        const shareLink = `http://http://142.93.160.50:5000/files/${fileId}`; // Update with your actual domain
        res.json({ shareLink });
    } catch (error) {
        console.error("Error generating share link:", error);
        res.status(500).json({ message: "Failed to generate share link." });
    }
});

module.exports = router;
