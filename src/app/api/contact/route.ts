import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, interest, budget, contactMethod, message } = await req.json();

    // ✅ Configure transporter (Gmail Workspace / SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // STARTTLS (true only for port 465)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Compose the email
    const mailOptions = {
      from: `"AiNiBo Systems Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `📩 New Contact Message from ${name || "Unknown Sender"}`,
      text: `
New contact message received:

Name: ${name || "—"}
Email: ${email || "—"}
Phone: ${phone || "—"}
Interest: ${interest || "—"}
Budget: ${budget || "—"}
Preferred Contact: ${contactMethod || "—"}

Message:
${message || "—"}
      `,
      // ✅ Optional: HTML version for better readability
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px; background: #f6f8fa; color: #222;">
          <h2 style="color:#2370BC;">📩 New Contact Message</h2>
          <p><strong>Name:</strong> ${name || "—"}</p>
          <p><strong>Email:</strong> ${email || "—"}</p>
          <p><strong>Phone:</strong> ${phone || "—"}</p>
          <p><strong>Interest:</strong> ${interest || "—"}</p>
          <p><strong>Budget:</strong> ${budget || "—"}</p>
          <p><strong>Preferred Contact:</strong> ${contactMethod || "—"}</p>
          <hr style="margin:20px 0;border:none;border-top:1px solid #ccc;">
          <p style="white-space:pre-line;"><strong>Message:</strong><br>${message || "—"}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
