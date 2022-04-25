import Link from "next/link";

import { FiMenu } from "react-icons/fi";
import { useState } from "react";

import MyLogo from "./MyLogo";

import MobileNavScreen from "./MobileNavScreen";
import Logo from "./Logo";
const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-8 w-screen h-24">
        <div className="flex items-center">
          <Logo />
          <span className="ml-4 md:ml-8 font-normal">
            <Link href="/socials">socials</Link>
          </span>
        </div>

        <div className="flex items-center text-[#e21ecb]">
          <span className="hidden md:block">Leon Rode</span>
          <MyLogo />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
