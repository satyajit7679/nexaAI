import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendOtpEmail = async (email, otp) => {
  const info = await transporter.sendMail({
    from: `"NexaAI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "NexaAI Email Verification OTP",

    html: `
            <h2>NexaAI Email Verification</h2>
            <p>Your verification OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP will expire in 10 minutes.</p>
        `,
  });

  console.log(`OTP email accepted by Gmail for ${email} (${info.messageId})`);
};

export default transporter;
