require("dotenv").config();
const express = require("express");
const cors = require('cors'); // Import cors
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
connectDB();
// Use CORS

const corsOptions = {
  origin: 'http://142.93.160.50:3000', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // Include credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Use CORS with options

app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use("/users", authRoutes);
app.use("/files", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
