import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !/[^@\s]+@[^@\s]+\.[^@\s]+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Option A: confirmation email to the subscriber
    await resend.emails.send({
      from: "Kinywa Coffee <hello@your-domain.com>", // must be a verified domain in Resend
      to: email,
      subject: "You're on the Kinywa list ☕",
      text: "Thanks for subscribing! We'll be in touch with new roasts and events.",
    });

    // Option B: store the subscriber in an Audience instead (or in addition)
    // await resend.contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID! });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
