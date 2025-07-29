import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import LoginButton from "@/components/login";
import Navbar from "@/components/navbar";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoginButton />
      </div>
    );
  }
  if (session) {
    return (
      <div className="flex flex-row h-screen">
        <div className="h-full">
          <Navbar />
        </div>
        <div className="">
          <h1>{user?.name}</h1>
        </div>
      </div>
    );
  }
};

export default Dashboard;
