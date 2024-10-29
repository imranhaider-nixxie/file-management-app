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

console.log("Auth Middleware:", authMiddleware);
console.log("Upload File:", uploadFile);
console.log("Get Files:", getFiles);
console.log("Get File Stats:", getFileStats);

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/", authMiddleware, getFiles);
router.get("/statistics/:fileId", authMiddleware, getFileStats);
router.get("/share/:fileId", shareFile);



module.exports = router;
