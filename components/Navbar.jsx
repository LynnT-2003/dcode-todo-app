import React from "react";
import Link from "next/link";
import { RiAddBoxLine, RiAddCircleLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-400 px-8 py-3">
      <Link className="text-white font-bold text-2xl pl-4" href={"/"}>
        ToDecode-App
      </Link>
      <Link className="text-white text-bold p-2" href={"/addTask"}>
        <RiAddBoxLine size={60} />
        {/* <RiAddCircleLine size={60} /> */}
      </Link>
    </nav>
  );
};

export default Navbar;
