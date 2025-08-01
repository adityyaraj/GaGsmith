"use client"
import { User } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Logo = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated" || !session?.user?.image) {
    return (
      <div>
        <User className="w-6 h-6 rounded-full" />
      </div>
    );
  }
  
  return (
    <div>
      <Image
        src={session.user.image}
        alt="User Image"
        width={25}
        height={25}
        className="rounded-full"
      />
    </div>
  );
};

export default Logo;
