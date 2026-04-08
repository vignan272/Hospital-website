const jwt = require("jsonwebtoken");

// ========================
// Verify Token
// ========================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const token = authHeader.split(" ")[1]; // Bearer token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ========================
// Patient Role
// ========================
const isPatient = (req, res, next) => {
  if (req.user.role !== "patient") {
    return res.status(403).json({ message: "Patient access required" });
  }
  next();
};

// ========================
// Doctor Role
// ========================
const allowDoctor = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ message: "Doctor access required" });
  }
  next();
};

// ========================
// ✅ Admin Role (NEW)
// ========================
const allowAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = {
  verifyToken,
  isPatient,
  allowDoctor,
  allowAdmin, // 👈 export this
};
