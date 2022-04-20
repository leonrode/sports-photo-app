import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="cursor-pointer text-lg md:text-4xl font-bold">
        Elliott Zhang
      </h1>
    </Link>
  );
};

export default Logo;
