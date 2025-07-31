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
    <div className="h-full flex justify-center items-center flex-col gap-4 w-full">
      <div className="">
        {" "}
        <Image
          src={imageSrc}
          alt="User Image"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>
      <div className="">{name}</div>
      <div className="">{email}</div>
      <Logout/>
    </div>
  );
};

export default Profile;
