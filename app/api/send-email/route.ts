import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email, studentName, status, message } = await request.json();

    // SMTP configuration from environment
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || "587");
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const from =
      process.env.EMAIL_FROM ||
      '"LCCS Admissions" <noreply@lideta-catholic.org>';

    let transporter;
    let previewUrl: string | null = null;

    if (host && user && pass) {
      // Real SMTP (Gmail, etc.)
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    } else {
      // Fallback to Ethereal for demo – shows a preview link
      const { createTestAccount } = await import("nodemailer");
      const testAccount = await createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      previewUrl = `https://ethereal.email/message/${testAccount.web}`;
    }

    const statusText =
      status === "approved"
        ? "Approved"
        : status === "rejected"
          ? "Rejected"
          : "Waitlisted";
    const statusColor =
      status === "approved"
        ? "green"
        : status === "rejected"
          ? "red"
          : "orange";

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e3e6; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #031634;">Lideta Catholic Cathedral School</h2>
        </div>
        <p>Dear ${studentName},</p>
        <p>Your registration application has been <strong style="color: ${statusColor};">${statusText}</strong>.</p>
        ${message ? `<p><strong>Message from the admissions office:</strong><br/>${message}</p>` : ""}
        <p>If you have any questions, please contact the admissions office.</p>
        <p>Thank you for choosing LCCS.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e3e6;">
        <p style="font-size: 12px; color: #75777e;">© ${new Date().getFullYear()} Lideta Catholic Cathedral School. All rights reserved.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from,
      to: email,
      subject: `Your Registration Status Update - LCCS`,
      html: emailContent,
    });

    if (previewUrl) {
      return NextResponse.json({
        success: true,
        previewUrl,
        note: "Email sent to test inbox. Click the link to view.",
      });
    }

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
