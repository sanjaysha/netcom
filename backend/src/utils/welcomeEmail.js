import nodemailer from "nodemailer";
import { createWelcomeEmailTemplate } from "../lib/emailTemplates.js";

export const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: createWelcomeEmailTemplate(
      options.name,
      options.message,
      options.clientUrl,
    ),
  };

  await transporter.sendMail(mailOptions);
};
