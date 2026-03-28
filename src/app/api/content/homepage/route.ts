import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { saveHomepageContent, readHomepageContent } from "@/lib/homepage-content-store";
import type { HomepageContent } from "@/content/homepage-content";

export async function GET() {
  const content = await readHomepageContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as HomepageContent;
    const content = await saveHomepageContent(body);

    revalidatePath("/");
    revalidatePath("/admin/content");

    return NextResponse.json({ ok: true, content });
  } catch {
    return NextResponse.json({ error: "Unable to save homepage content" }, { status: 500 });
  }
}
