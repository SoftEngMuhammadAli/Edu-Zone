import ContactUs from "../../models/contact-us/contact_us_model.js";
import Notification from "../../models/notifications/notification_model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

dotenv.config();

export const sendContactMessage = catchAsyncHandler(async (req, res) => {
  try {
    const { fullname, email, subject, message } = req.body;

    if (
      !fullname ||
      typeof fullname !== "string" ||
      fullname.trim().length < 2
    ) {
      return res
        .status(400)
        .json({ error: "Full name must be at least 2 characters." });
    }

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (!subject || subject.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Subject must be at least 3 characters." });
    }

    if (!message || message.trim().length < 10) {
      return res
        .status(400)
        .json({ error: "Message must be at least 10 characters." });
    }

    const newContact = new ContactUs({ fullname, email, subject, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${fullname}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `📬 Contact Form: ${subject}`,
      text: `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    await Notification.create({
      userId: null,
      message: `📬 New contact form from ${fullname}`,
      type: "custom",
      link: `/admin/contact-us`,
    });

    return res.status(200).json({
      message: "Message received and email sent successfully!",
    });
  } catch (error) {
    console.error("❌ Contact error:", error);
    return res.status(500).json({
      error: "Server error: Unable to send message. Try again later.",
    });
  }
});
