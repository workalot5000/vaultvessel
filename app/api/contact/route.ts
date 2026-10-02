import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  // TODO: forward to email / CRM. For now this logs to the server console.
  console.log("CONTACT MESSAGE", JSON.stringify(body, null, 2));
  return NextResponse.json({ ok: true });
}