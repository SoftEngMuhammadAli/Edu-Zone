import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// EJS + NODEMAILER
/*
    -> OTP GENERATION
*/

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, templateName, data) => {
  const templatePath = path.join(
    __dirname,
    `../template/emails/${templateName}.ejs`
  );

  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: `"Your LMS" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
