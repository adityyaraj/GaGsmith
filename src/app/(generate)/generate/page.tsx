"use client";
import LoginButton from "@/components/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";

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
    <div className="h-full flex justify-center items-center gap-2">
      <div>
        {image && (
          <Image
            src={image}
            alt="Generated"
            width={512}
            height={512}/>
        )}
      </div>
      <div>
        <Input className="h-10 w-100"
        value={prompt}
        onChange ={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div>
        <Button
        className="transition-transform hover:scale-105"
        onClick={generate}
        disabled ={loading|| !prompt}
        >{loading ? "Generating.." : "Generate" }</Button>
      </div>
    </div>
  );
};

export default Generate;
