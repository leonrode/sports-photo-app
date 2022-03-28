import Link from "next/link";

import { FiX } from "react-icons/fi";

const MobileNavScreen = ({ show, toClose }) => {
  return (
    <div
      className={`${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed top-0 left-0 transition-fade duration-250 md:hidden w-screen h-screen bg-light-bg flex flex-col justify-center items-center`}
    >
      <h1 className="text-2xl mb-16 font-thin w-fit">Zhang Photography</h1>
      <span className="mb-4">
        <Link href="/">home</Link>
      </span>

      <span className="mb-4">
        <Link href="/">about</Link>
      </span>
      <span className="mb-16">
        <Link href="/">socials</Link>
      </span>

      <FiX onClick={toClose} size={30} className="cursor-pointer text-black" />
    </div>
  );
};

export default MobileNavScreen;
