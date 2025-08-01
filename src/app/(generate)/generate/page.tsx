"use client";
import LoginButton from "@/components/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import FileInput from "@/components/file";
import { Gauge } from "lucide-react";

const Generate = () => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = React.useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const generate = async () => {
    setLoading(true);
    setImage(null);

    const res = await fetch("api/llm", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  };
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
        {image && (
          <Image src={image} alt="Generated" width={512} height={512} />
        )}
      </div>
      <div className="pb-50 flex flex-col justify-center items-center gap-2">
      <div><Gauge width={100} height={100}/></div>
      <div className="text-4xl font-semibold"><h1>Spin Ideas into Reality with AI.</h1></div>
      <div className="text-xl text-foreground/50"><h3>Just drop a prompt and let it flow.</h3></div>
      <div className="max-w-2xl w-full flex flex-col mx-auto border border-foreground/40 rounded-md mt-5">
      
        <Textarea
          placeholder="Enter your prompt here."
          className="px-3 rounded-md text-md border-none focus:border-none focus:outline-none mt-2 resize-none text-primary/80"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-between items-center p-3">
            <FileInput/>
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
