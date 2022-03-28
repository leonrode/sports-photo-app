import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-start px-8 w-screen h-24">
      <h1 className="text-4xl font-thin w-fit">Zhang Photography</h1>
      <div className="ml-16 flex items-center justify-between w-1/5">
        <Link href="/">home</Link>

        <Link href="/">about</Link>
        <Link href="/">socials</Link>
      </div>
    </nav>
  );
};

export default Navbar;
