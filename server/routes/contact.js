const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
    console.log("📬 Received contact form submission:", req.body);
  const { name, email, message } = req.body;

  try {
    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email via Zoho
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Transporter setup failed:", error);
  } else {
    console.log("✅ Server is ready to send email.");
  }
});
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
    });

    res.status(200).json({ success: true, message: "Message sent and saved." });
  } catch (error) {
    console.error("Error processing contact form:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});

module.exports = router;
