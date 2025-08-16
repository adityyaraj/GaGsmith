import { NextResponse } from "next/server";
import Client from "magic-hour";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const token = process.env.API_TOKEN;
  if (!token) return NextResponse.json({ error: "Missing API_TOKEN env var." }, { status: 500 });

  try {
    const client = new Client({ token });
    const res = await client.v1.imageProjects.get({ id });

    const status = res?.status ?? "unknown";
    const downloads = res?.downloads ?? [];
    const imageUrl = downloads[0]?.url ?? null;

    return NextResponse.json({ id, status, imageUrl, downloads, raw: res }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job." }, { status: 500 });
  }
}