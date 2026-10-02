import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.contact?.name || !body?.contact?.email || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  const ref = "VV-" + Date.now().toString(36).toUpperCase();
  // TODO: send to email / CRM here (Resend, Postmark, HubSpot, etc.). For now it logs to the server console.
  console.log("QUOTE REQUEST", ref, JSON.stringify(body, null, 2));
  return NextResponse.json({ ok: true, ref });
}