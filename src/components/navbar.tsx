"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  BotMessageSquare,
  User,
  Images,
  Image,
  CircleChevronRight,
  CircleChevronLeft,
  BookImage,
} from "lucide-react";
import { ModeToggle } from "./toggle";
import Logo from "./logo";

const Navbar = () => {
  const [close, setClose] = useState(false);
  const items = [
    { icon: <BotMessageSquare />, label: "Generate", link: "/generate" },
    { icon: <Logo />, label: "Profile", link: "/profile" },
    { icon: <Images />, label: "All Images", link: "/image" },
  ];
  return (
    <div className={`border-r border-gray-500 flex flex-col justify-between transition-all duration-300 ${!close? 'w-80':'w-15'}`}>
      <div className="flex flex-col gap-5 ">
        <div className=" flex justify-between mt-5 mx-5">
          {!close&&<h1 className="text-2xl font-semibold">Generative</h1>}
          
          <div>
            <button onClick={() => setClose(!close)}>
              {!close ? <CircleChevronRight /> : <CircleChevronLeft />}
            </button>
          </div>
        </div>

        {items.map((item, i) => (
          <div key={i} className="link-main">
            <Link href={item.link}>
              <div className="flex gap-2">
                <div>{item.icon}</div>
                {!close && <div>{item.label}</div>}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mx-auto mb-5">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
