import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const phone = body.phone?.trim() || "";
    const message = body.message?.trim() || "";

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Lütfen adınızı girin." },
        { status: 400 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta girin." },
        { status: 400 },
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Mesajınız en az 10 karakter olmalı." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Selena <onboarding@resend.dev>";

    if (!apiKey || !toEmail) {
      console.info("[contact] Message received (email not configured)", {
        name,
        email,
        phone,
        message,
      });
      return NextResponse.json({
        ok: true,
        delivered: false,
        message: "Message accepted (email delivery not configured).",
      });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Yeni iletişim formu: ${name}`,
      text: [
        `Ad: ${name}`,
        `E-posta: ${email}`,
        `Telefon: ${phone || "-"}`,
        "",
        "Mesaj:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { error: "E-posta gönderilemedi. Lütfen tekrar deneyin." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] Unexpected error", error);
    return NextResponse.json(
      { error: "Beklenmeyen bir hata oluştu." },
      { status: 500 },
    );
  }
}
