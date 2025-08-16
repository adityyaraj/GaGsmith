import { NextResponse } from "next/server";
import Client from "magic-hour";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const topic = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const template = typeof body?.meme === "string" && body.meme.trim() ? body.meme.trim() : "Random";

    if (!topic) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const token = process.env.API_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Missing API_TOKEN env var." }, { status: 500 });
    }

    const client = new Client({ token });

    // Create meme job; you’ll poll imageProjects by id
    const job = await client.v1.aiMemeGenerator.create({
      name: `Meme: ${topic.slice(0, 50)}`,
      style: {
        searchWeb: false,
        template,
        topic,
      },
    });

    // SDK returns: { id, frame_cost (deprecated), credits_charged }
    return NextResponse.json(
      { id: job.id, prompt: topic, template, credits_charged: job.creditsCharged },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create job failed:", error);
    return NextResponse.json({ error: "Failed to create job." }, { status: 500 });
  }
}