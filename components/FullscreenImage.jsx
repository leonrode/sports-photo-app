import { FiX } from "react-icons/fi";

import { FiShare2, FiDownload, FiCheck } from "react-icons/fi";

import { useState } from "react";

const FullscreenImage = ({ event, link, toClose }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-opaque">
      <div className="h-screen">
        <FiX
          className="lg:mt-16 lg:mx-64 text-white"
          size={30}
          onClick={() => {
            setCopied(false);
            toClose();
          }}
        />

        <div className="flex justify-center w-full  lg:mt-16 h-2/3">
          <img className="max-w-full max-h-full" src={link}></img>
        </div>

        <h1 className="mt-4 text-xl text-center font-bold text-white">
          {event.title}
        </h1>
        <div className="mt-4 flex h-64 text-white justify-center">
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
          <FiDownload className="cursor-pointer ml-4" size={20} />
        </div>
      </div>
    </div>
  );
};

export default FullscreenImage;
