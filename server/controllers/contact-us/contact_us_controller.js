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
