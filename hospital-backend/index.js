require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path"); // ✅ ADD THIS

// database connection
require("./Models/db");

const PORT = process.env.PORT || 8080;

app.use(cors());

// middleware
app.use(express.json());

// ✅ VERY IMPORTANT (serve uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
const patientRoutes = require("./Routes/patientRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const doctorRoutes = require("./Routes/doctorRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const publicRoutes = require("./Routes/publicRoutes");

app.use("/api/patient", patientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/public", publicRoutes);
app.use("/api", contactRoutes);

// test route
app.get("/ping", (req, res) => {
  res.send("PONG");
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
