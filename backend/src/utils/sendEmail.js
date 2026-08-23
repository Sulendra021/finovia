const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, html, text }) {
  try {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: user && pass ? { user, pass } : undefined,
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"Finovia Support" <${user || "no-reply@finovia.com"}>`,
      to,
      subject,
      text,
      html
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Email] Sent to ${to}: Message ID ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[SMTP Email Error] Failed to send email to ${to}:`, error.message);
    if (process.env.NODE_ENV === "test") {
      return null;
    }
    throw new Error("Unable to deliver email via SMTP. Please try again later or contact support.");
  }
}

module.exports = sendEmail;
