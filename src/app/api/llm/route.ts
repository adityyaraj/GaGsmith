import { NextResponse } from "next/server";

// POST /api/llm
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // handles plain text like "Not Found"
      console.error("Hugging Face API Error:", response.status, errorText);
      return NextResponse.json({ error: "Image generation failed." }, { status: 500 });
    }

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${base64}`,
    });
  } catch (err) {
    console.error("Image generation failed:", err);
    return NextResponse.json({ error: "Unexpected error occurred." }, { status: 500 });
  }
}
