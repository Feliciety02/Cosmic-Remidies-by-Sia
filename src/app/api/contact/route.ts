import { appendFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const submissionsDir = path.join(process.cwd(), ".submissions");
const contactLogPath = path.join(submissionsDir, "contact.jsonl");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await mkdir(submissionsDir, { recursive: true });
    await appendFile(
      contactLogPath,
      `${JSON.stringify({
        type: "contact",
        submittedAt: new Date().toISOString(),
        name,
        email,
        subject,
        message,
      })}\n`,
      "utf8",
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save submission" }, { status: 500 });
  }
}
