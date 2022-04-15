import { FiX } from "react-icons/fi";

import { FiShare2, FiDownload, FiCheck } from "react-icons/fi";

import { useState } from "react";

import { parseDate } from "../lib/utils";

const FullscreenImage = ({ event, link, smallerLink, toClose }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-opaque">
      <div className="h-screen lg:block flex flex-col justify-center items-center">
        <FiX
          className=" cursor-pointer lg:mt-16 lg:mx-64 text-white"
          size={30}
          onClick={() => {
            setCopied(false);
            toClose();
          }}
        />

        <div className="flex justify-center w-full  lg:mt-16 h-fit md:h-2/3">
          <img className="max-w-full max-h-fit lg:h-auto mt-16 lg:mt-0 " src={smallerLink}></img>
        </div>

        <h1 className="mt-4 text-xl text-center font-bold justify-center flex items-center text-white">
          {event.title}{" "}
          <span className=" text-base ml-2 opacity-50 font-normal">
            | {parseDate(event.date)}{" "}
          </span>
        </h1>
        <div className="mt-4 flex lg:h-64 text-white justify-center">
          {copied ? (
            <FiCheck size={20} />
          ) : (
            <FiShare2
              onClick={async () => {
                await navigator.clipboard.writeText(link);
                setCopied(true);
              }}
              className="cursor-pointer"
              size={20}
            />
          )}
          <a href={link} download={link}>
            <FiDownload className="cursor-pointer ml-4" size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FullscreenImage;
