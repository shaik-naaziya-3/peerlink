const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "PeerLink Backend is running successfully!"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`PeerLink server running on http://localhost:${PORT}`);
  });
};

startServer();