const Contact = require("../Models/Contact");
const { sendContactEmail } = require("../Services/emailService");

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    const contact = new Contact({
      name,
      email,
      description,
    });

    await contact.save();

    await sendContactEmail(contact);

    res.json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
