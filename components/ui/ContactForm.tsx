"use client";

import { useState, type FormEvent } from "react";

type Props = {
  formTitle?: string | null;
  formSubtext?: string | null;
  successMessage?: string | null;
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({
  formTitle,
  formSubtext,
  successMessage,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Gönderim başarısız.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.75rem] border border-cocoa/10 bg-white/60 p-8 md:p-10">
        <p className="font-serif text-3xl text-cocoa">Teşekkürler</p>
        <p className="mt-4 text-sm leading-relaxed text-taupe">
          {successMessage ||
            "Mesajınız alındı. En kısa sürede dönüş yapacağız."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-cocoa underline underline-offset-4"
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.75rem] border border-cocoa/10 bg-white/60 p-8 md:p-10"
    >
      {formTitle ? (
        <h3 className="font-serif text-3xl text-cocoa">{formTitle}</h3>
      ) : null}
      {formSubtext ? (
        <p className="mt-3 text-sm text-taupe">{formSubtext}</p>
      ) : null}

      <div className="mt-8 grid gap-4">
        <label className="grid gap-2 text-sm text-cocoa">
          Ad Soyad
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="rounded-2xl border border-cocoa/10 bg-ivory px-4 py-3 outline-none transition focus:border-cocoa/30"
          />
        </label>

        <label className="grid gap-2 text-sm text-cocoa">
          E-posta
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-2xl border border-cocoa/10 bg-ivory px-4 py-3 outline-none transition focus:border-cocoa/30"
          />
        </label>

        <label className="grid gap-2 text-sm text-cocoa">
          Telefon
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="rounded-2xl border border-cocoa/10 bg-ivory px-4 py-3 outline-none transition focus:border-cocoa/30"
          />
        </label>

        <label className="grid gap-2 text-sm text-cocoa">
          Mesaj
          <textarea
            required
            name="message"
            rows={5}
            className="resize-none rounded-2xl border border-cocoa/10 bg-ivory px-4 py-3 outline-none transition focus:border-cocoa/30"
          />
        </label>
      </div>

      {status === "error" ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cocoa px-7 py-3.5 text-sm font-medium text-ivory transition hover:bg-graphite disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}
