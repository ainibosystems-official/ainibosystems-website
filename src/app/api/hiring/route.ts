import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, area, portfolio, message } = await req.json();

    // ✅ Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Compose the email
    const mailOptions = {
      from: `"AiNiBo Systems Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send to yourself
      subject: `💼 New Hiring Application from ${name || "Unknown Applicant"}`,
      text: `
New hiring application received:

Name: ${name || "—"}
Email: ${email || "—"}
Area of Expertise: ${area || "—"}
Portfolio: ${portfolio || "—"}

Message:
${message || "—"}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px; background: #f6f8fa; color: #222;">
          <h2 style="color:#2370BC;">💼 New Hiring Application</h2>
          <p><strong>Name:</strong> ${name || "—"}</p>
          <p><strong>Email:</strong> ${email || "—"}</p>
          <p><strong>Area of Expertise:</strong> ${area || "—"}</p>
          <p><strong>Portfolio:</strong> <a href="${portfolio}" target="_blank">${portfolio || "—"}</a></p>
          <hr style="margin:20px 0;border:none;border-top:1px solid #ccc;">
          <p style="white-space:pre-line;"><strong>Message:</strong><br>${message || "—"}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Hiring email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
