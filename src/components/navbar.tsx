import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-col gap-5 h-full border-r border-gray-200 md:w-80">
        <div className="text-2xl font-semibold flex justify-center mt-5"><h1 className="">Dashboard</h1></div>
      <div className="link-main">
        <Link href="/">Generate</Link>
      </div>
      <div className="link-main">
        <Link href="/">Profile</Link>
      </div>
      <div className="link-main">
        <Link href="/">Images</Link>
      </div>
    </div>
  );
};

export default Navbar;
