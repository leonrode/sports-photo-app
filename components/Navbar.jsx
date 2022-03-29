import Link from "next/link";

import { FiMenu } from "react-icons/fi";
import { useState } from "react";

import MobileNavScreen from "./MobileNavScreen";
import Logo from "./Logo";
const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between md:justify-start px-8 w-screen h-24">
        <Logo />
        <div className="hidden md:flex ml-16 items-center justify-between w-1/5">
          <Link href="/">home</Link>

          <Link href="/">about</Link>
          <Link href="/">socials</Link>
        </div>

        <div onClick={() => setShowMobileNav(true)} className="md:hidden">
          <FiMenu size={30} className="cursor-pointer text-black" />
        </div>
      </nav>
      <MobileNavScreen
        toClose={() => setShowMobileNav(false)}
        show={showMobileNav}
      />
    </>
  );
};

export default Navbar;