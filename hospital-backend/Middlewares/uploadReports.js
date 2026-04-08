const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname.split(".").slice(0, -1).join(".");

    return {
      folder: "medical_reports",
      resource_type: "auto",
      public_id: Date.now() + "-" + originalName,
      type: "upload",
      access_mode: "public",
    };
  },
});

// ✅ File Filter (IMPORTANT)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Image files are allowed"), false);
  }
};

const uploadReports = multer({
  storage,
  fileFilter, // ✅ ADD THIS
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = uploadReports;
