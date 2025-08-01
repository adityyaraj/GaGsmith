
import LoginButton from "@/components/login";
import Logout from "@/components/logout";
import { auth } from "@/lib/auth";
import Image from "next/image";
import React from "react";

const Profile = async () => {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="h-full flex justify-center items-center flex-col gap-4">
        <div className="">Please log in to view your profile.</div>
        <div>
          <LoginButton />
        </div>
      </div>
    );
  }
  const { name, email, image } = session?.user;
  const imageSrc = session?.user?.image ?? "/default-avatar.png";
  return (
    <div className="h-full flex justify-center items-center flex-col w-full">
      <div className="flex justify-center items-center flex-col gap-4 border-1 rounded-xl border-foreground w-100 h-80 shadow-sm shadow-foreground/50">
      <div className="border-2 rounded-full border-foreground">
        {" "}
        <Image
          src={imageSrc}
          alt="User Image"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>
      <div className="font-bold">{name}</div>
      <div className="">{email}</div>
      <Logout/>
      </div>
    </div>
  );
};

export default Profile;
