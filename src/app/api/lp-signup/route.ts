import { NextResponse } from "next/server";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const ROBERT_EMAIL = "robertneir@alltogethercapital.com";
const HISHAM_EMAIL = "hisham@alltogethercapital.com";
const FROM_EMAIL = process.env.RESEND_FROM ?? "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email } = body as {
      firstName?: string;
      lastName?: string;
      email?: string;
    };

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: "Email is not configured. Please set RESEND_API_KEY." },
        { status: 503 }
      );
    }

    const textBody = [
      `First name: ${firstName.trim()}`,
      `Last name: ${lastName.trim()}`,
      `Email: ${email.trim()}`,
    ].join("\n");

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ROBERT_EMAIL,
      cc: [HISHAM_EMAIL],
      subject: "Potential All2 Capital LP",
      text: textBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (e) {
    console.error("LP signup API error:", e);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
