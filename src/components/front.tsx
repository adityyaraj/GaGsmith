"use client";
import Link from "next/link";
import { ModeToggle } from "./toggle";
import { AuroraText } from "./magicui/aurora-text";
import { ShimmerButton } from "./magicui/shimmer-button";
import { TypingAnimation } from "./magicui/typing-animation";
const Front = () => {
  return (
    <div className="bg-background h-screen h-full">
      <div className="p-5 flex justify-between items-center bg-background/70 backdrop-blur top-0 sticky z-50 border-b border-foreground/50">
        <div className="text-2xl font-bold">
          <h1>Logo</h1>
        </div>
        <div className="flex gap-8">
          <div className=" font-semibold">
            <Link href="/">Home</Link>
          </div>
          <div className=" font-semibold">
            <Link href="/about">About</Link>
          </div>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>

      <div className="mt-30 flex flex-col items-center">
        <div className="relative flex flex-col items-center text-center gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">
              <AuroraText colors={["#a3ee5b", "#66d855", "#40ba0f"]}>
                AI Image Generator
              </AuroraText>{" "}
            </h1>
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-foreground/50 to-foreground text-transparent bg-clip-text">
                Your Imagination, Visualized.
              </span>
            </h1>
          </div>
        </div>
        <div>
          <div className="text-sm md:text-2xl text-foreground/50">
            <TypingAnimation>
              Generate AI Images in seconds with just one prompt
            </TypingAnimation>
          </div>
        </div>
        <div>
          <Link href="/generate">
            <ShimmerButton className="mt-4 font-semibold ">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </div>

      <div className="h-2/4">hi</div>
    </div>
  );
};

export default Front;
