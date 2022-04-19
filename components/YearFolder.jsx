import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

import { useState } from "react";
const YearFolder = ({ year }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={`/year/${year.year}`}>
      <div
        className={`${
          loaded ? "block" : "hidden"
        } group relative h-fit w-fit cursor-pointer`}
      >
        <img
          className="rounded-xl"
          src={year.cover.smaller ? year.cover.smaller : "/placeholder.png"}
          onLoad={() => setLoaded(true)}
        ></img>
        <div className="py-2 flex justify-between items-center px-4 absolute bottom-0 rounded-br-lg rounded-bl-lg w-full bg-white">
          <div>
            <h1 className="text-xl font-bold">{year.year}</h1>
          </div>
          <FiChevronRight size={30} />
        </div>
      </div>
    </Link>
  );
};

export default YearFolder;
