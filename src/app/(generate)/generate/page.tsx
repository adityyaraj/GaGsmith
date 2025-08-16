"use client";
import LoginButton from "@/components/login";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { useState,useEffect } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import FileInput from "@/components/file";
import { Gauge } from "lucide-react";

const Generate = () => {
  const memes: string[] = [
    "Random",
    "Drake Hotline Bling",
    "Galaxy Brain",
    "Two Buttons",
    "Gru's Plan",
    "Tuxedo Winnie The Pooh",
    "Is This a Pigeon",
    "Panik Kalm Panik",
    "Disappointed Guy",
    "Waiting Skeleton",
    "Bike Fall",
    "Change My Mind",
    "Side Eyeing Chloe",
  ];

  const { data: session } = useSession();
  const [prompt, setPrompt] = React.useState("");
  const [meme, setMeme] = React.useState("");
  const [memeon, setMemeOn] = React.useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const generate = async () => {
    setLoading(true);
    setImage(null);
    setJobId(null);
    try {
      const template = meme || "Random";
      const res = await fetch("/api/llm", {
        method: "POST",
        body: JSON.stringify({  prompt, meme: template }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        console.error("API Error:", data?.error || res.statusText);
        alert(`Error: ${data?.error || "Request failed"}`);
        return;
      }

      if (data.imageUrl) {
        setImage(data.imageUrl);
        return;
      }
      if (data.downloads?.[0]?.url) {
        setImage(data.downloads[0].url);
        return;
      }
      if (data.id) {
        setJobId(data.id);
        return;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(
        "Failed to generate image. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (!jobId) return;
  let cancelled = false;

  const poll = async () => {
    try {
      const r = await fetch(`/api/llm/${jobId}`);
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Status fetch failed");

      if (data.imageUrl && !cancelled) {
        setImage(data.imageUrl);
      } else if (!cancelled && (!data.status || data.status === "running" || data.status === "queued")) {
        setTimeout(poll, 2000);
      } else if (data.status === "failed") {
        console.error("Generation failed:", data);
      }
    } catch {
      if (!cancelled) setTimeout(poll, 3000);
    }
  };

  poll();
  return () => { cancelled = true; };
}, [jobId]);
  if (!session?.user) {
    return (
      <div className="h-full flex justify-center items-center flex-col gap-4">
        <div className="">Please log in to start.</div>
        <div>
          <LoginButton />
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col justify-center ">
      <div>
        {loading && (
          <div className="text-center text-muted-foreground py-4">
            Generating image...
          </div>
        )}
        {jobId && !image && (
          <div className="text-center text-muted-foreground py-2">
            Job started: {jobId}. Waiting for image...
          </div>
        )}

        {typeof image === "string" && image.trim() !== "" && (
          <Image
            src={image}
            alt="Generated"
            width={848}
            height={848}
            className="rounded shadow-md"
          />
        )}
      </div>
      <div className="pb-50 flex flex-col justify-center items-center gap-2">
        <div>
          <Gauge width={100} height={100} />
        </div>
        <div className="text-4xl font-semibold">
          <h1>Spin Ideas into Reality with AI.</h1>
        </div>
        <div className="text-xl text-foreground/50">
          <h3>Just drop a prompt and let it flow.</h3>
        </div>
        <div className="max-w-2xl w-full flex flex-col mx-auto border border-foreground/40 rounded-md mt-5">
          <Textarea
            placeholder="Enter your prompt here."
            className="px-3 rounded-md text-md border-none focus:border-none focus:outline-none mt-2 resize-none text-primary/80"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex justify-between items-center p-3">
            <div className=" flex gap-2">
            <FileInput />
            <div>
              {" "}
              <button
                className="border border-foreground/50 p-1.5 rounded-md"
                onClick={() => {
                  setMemeOn(true);
                }}
              >
               {meme ? meme : "Template"}
              </button>
              {memeon && (
                <ul className="absolute z-10 mt-2 bg-background border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {memes.map((meme, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setMeme(meme);
                        setMemeOn(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-900 cursor-pointer"
                    >
                      {meme}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            </div>
            <Button
              className="transition-transform hover:scale-105"
              onClick={generate}
              disabled={loading || !prompt}
            >
              {loading ? "Generating.." : "Generate"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
