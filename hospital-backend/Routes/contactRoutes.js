const express = require("express");
const router = express.Router();

const { sendContactMessage } = require("../Controllers/contactController");

router.post("/contact", sendContactMessage);

module.exports = router;
