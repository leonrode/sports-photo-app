import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="cursor-pointer text-2xl md:text-4xl font-bold w-fit">
        Elliott Zhang
      </h1>
    </Link>
  );
};

export default Logo;
