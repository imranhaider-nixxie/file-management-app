const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { uploadFile, getFiles, getFileStats, shareFile } = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure this is correct
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
});

const upload = multer({ storage });
 

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/", authMiddleware, getFiles);
router.get("/statistics/:fileId", authMiddleware, getFileStats);
router.get("/share/:fileId", shareFile);
// Increment view count for a file
router.get('/files/view/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).send({ error: 'File not found' });
    }

    // Increment view count
    file.viewCount += 1;
    await file.save();

    res.status(200).send({ message: 'View count updated', file });
  } catch (error) {
    res.status(500).send({ error: 'Error updating view count' });
  }
});


module.exports = router;
