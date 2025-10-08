require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Allow requests from your frontend URLs
const allowedOrigins = [
  "http://localhost:3000",           // local dev
  "https://your-frontend.onrender.com" // replace with deployed frontend URL
];

app.use(cors({ origin: allowedOrigins }));
app.use(bodyParser.json());

// Connect to MongoDB using .env
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Health check route
app.get("/", (req, res) => res.send("Backend OK"));

// Contact form routes
app.use("/api/contact/submit", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
