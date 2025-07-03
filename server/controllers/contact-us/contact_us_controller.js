import ContactUs from "../../models/contact-us/contact_us_model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

dotenv.config();

export const sendContactMessage = catchAsyncHandler(async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Raw body:", req.body);

  try {
    const { fullname, email, subject, message } = req.body;

    if (
      !fullname ||
      typeof fullname !== "string" ||
      fullname.trim().length < 2
    ) {
      return res.status(400).json({
        error: "Full name is required and must be at least 2 characters.",
      });
    }

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return res.status(400).json({
        error: "Subject is required and must be at least 3 characters.",
      });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return res.status(400).json({
        error: "Message is required and must be at least 10 characters.",
      });
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
      from: `"Mail From ${fullname}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Subject: ${subject}`,
      text: `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Message received and email sent!",
      data: mailOptions,
    });
  } catch (error) {
    console.error("Contact error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Try again later." });
  }
});
