import Link from "next/link";

import { FiX } from "react-icons/fi";
import Logo from "./Logo";
const MobileNavScreen = ({ show, toClose }) => {
  return (
    <div
      className={`${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed top-0 left-0 transition-fade duration-250 md:hidden w-screen h-screen bg-light-bg flex flex-col justify-center items-center`}
    >
      <Logo />
      <span className="mt-16">
        <Link href="/">home</Link>
      </span>

      <span className="mt-8">
        <Link href="/">about</Link>
      </span>
      <span className="mt-8">
        <Link href="/">socials</Link>
      </span>

      <FiX
        onClick={toClose}
        size={30}
        className="mt-16 cursor-pointer text-black"
      />
    </div>
  );
};

export default MobileNavScreen;
