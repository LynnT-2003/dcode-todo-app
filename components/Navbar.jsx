import React from "react";
import Link from "next/link";
import { RiAddBoxLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-400 px-8 py-3">
      <Link className="text-white font-bold text-xl" href={"/"}>
        ToDecode-App
      </Link>
      <Link className="text-white text-bold p-2" href={"/addTask"}>
        <RiAddBoxLine size={50} />
      </Link>
    </nav>
  );
};

export default Navbar;
