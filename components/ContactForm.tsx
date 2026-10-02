"use client";
import { useState } from "react";

const field = "w-full border border-ink/30 bg-transparent px-4 py-3 text-sm outline-none focus:border-bronze";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!data.ok) throw new Error();
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done")
    return (
      <div className="border-t border-ink py-10">
        <h2 className="font-display text-4xl font-semibold uppercase">Message received</h2>
        <p className="mt-3 max-w-md text-ink/75">Thank you. We will reply by email. For priced items, add products to your quote list and we will answer in a written quote.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input name="name" required placeholder="Full name" className={field} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" type="email" required placeholder="Email" className={field} />
        <input name="phone" placeholder="Phone" className={field} />
      </div>
      <select name="topic" className={field} defaultValue="General question">
        <option>General question</option>
        <option>Custom conversion</option>
        <option>Delivery question</option>
        <option>Marine / outboards</option>
        <option>Something else</option>
      </select>
      <textarea name="message" required rows={6} placeholder="How can we help?" className={field} />
      <button disabled={status === "sending"} className="btn disabled:opacity-40">{status === "sending" ? "Sending…" : "Send message"}</button>
      {status === "error" && <p className="text-sm text-bronze">Something went wrong. Please try again.</p>}
    </form>
  );
}