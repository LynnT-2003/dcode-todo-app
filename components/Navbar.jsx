import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-400 px-8 py-3">
      <Link className="text-white font-bold text-xl" href={"/"}>
        ToDecode-App
      </Link>
      <Link className="text-white text-bold p-2" href={"/addTask"}>
        Add+
      </Link>
    </nav>
  );
};

export default Navbar;
