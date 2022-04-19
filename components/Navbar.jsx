import Link from "next/link";

import { FiMenu } from "react-icons/fi";
import { useState } from "react";

import MobileNavScreen from "./MobileNavScreen";
import Logo from "./Logo";
const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-8 w-screen h-24">
        <div className="flex items-center">
          <Logo />
          <span className="ml-8">
            <Link href="/socials">socials</Link>
          </span>
        </div>
        {/* <div className="hidden md:flex ml-16 items-center justify-between w-1/5">
          <Link href="/">home</Link>
        </div> */}

        {/* <div onClick={() => setShowMobileNav(true)} className="md:hidden">
          <FiMenu size={30} className="cursor-pointer text-black" />
        </div> */}
        <h1 className="font-normal">
          Built by{" "}
          <Link href="https://leonro.de">
            <span className="cursor-pointer hover:underline">Leon Rode</span>
          </Link>
        </h1>
      </nav>
      {/* <MobileNavScreen
        toClose={() => setShowMobileNav(false)}
        show={showMobileNav}
      /> */}
    </>
  );
};

export default Navbar;
