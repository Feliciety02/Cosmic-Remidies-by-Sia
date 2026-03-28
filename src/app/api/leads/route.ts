import { appendFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const submissionsDir = path.join(process.cwd(), ".submissions");
const leadsLogPath = path.join(submissionsDir, "leads.jsonl");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      source?: string;
      firstName?: string;
      email?: string;
      consent?: boolean;
    };

    const email = body.email?.trim();
    const firstName = body.firstName?.trim() ?? "";
    const source = body.source?.trim() ?? "unknown";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (body.consent !== true) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 });
    }

    await mkdir(submissionsDir, { recursive: true });
    await appendFile(
      leadsLogPath,
      `${JSON.stringify({
        type: "lead",
        submittedAt: new Date().toISOString(),
        source,
        firstName,
        email,
        consent: true,
      })}\n`,
      "utf8",
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save submission" }, { status: 500 });
  }
}
