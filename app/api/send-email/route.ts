import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, studentName, status, message } = await request.json();

    // Log the request for debugging
    console.log("Sending email to:", email);
    console.log("API key present?", !!process.env.RESEND_API_KEY);

    const subject = `Your Registration Status Update - LCCS`;
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

    // Use Resend's test domain for development (emails won't actually send, but will appear in Resend dashboard)
    const { data, error } = await resend.emails.send({
      from: "LCCS Admissions <onboarding@resend.dev>",
      to: [email],
      subject,
      html: emailContent,
    });

    if (error) {
      console.error("Resend error details:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
