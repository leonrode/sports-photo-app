import { FiX } from "react-icons/fi";

import {
  FiShare2,
  FiDownload,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { useState, useEffect } from "react";

import { parseDate } from "../lib/utils";

const FullscreenImage = ({ event, link, smallerLink, toClose, imageIndex }) => {
  const [copied, setCopied] = useState(false);

  const [viewingImageIndex, setViewingImageIndex] = useState(imageIndex);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "ArrowRight") {
        if (viewingImageIndex + 1 < event.images.length)
          setViewingImageIndex((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        if (viewingImageIndex - 1 >= 0)
          setViewingImageIndex((prev) => prev - 1);
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

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

        <div className="flex justify-center w-full   lg:mt-16 h-fit md:h-2/3">
          <div className=" hidden lg:flex h-full flex-col justify-center mr-4 ">
            <FiChevronLeft
              size={30}
              className={`${
                viewingImageIndex !== 0
                  ? "text-white cursor-pointer"
                  : "text-gray"
              } `}
              onClick={() => {
                if (viewingImageIndex - 1 >= 0)
                  setViewingImageIndex(viewingImageIndex - 1);
              }}
            />
          </div>
          <img
            className="max-w-full max-h-fit lg:h-auto mt-16 lg:mt-0 "
            src={event.images[viewingImageIndex].smaller}
          ></img>
          <div className="hidden lg:flex h-full flex-col ml-4 justify-center">
            <FiChevronRight
              onClick={() => {
                if (viewingImageIndex + 1 < event.images.length)
                  setViewingImageIndex(viewingImageIndex + 1);
              }}
              size={30}
              className={`${
                viewingImageIndex !== event.images.length - 1
                  ? "text-white cursor-pointer"
                  : "text-gray"
              } `}
            />
          </div>
        </div>

        <div className="justify-center flex items-center mt-4 ">
          <FiChevronLeft
            onClick={() => {
              if (viewingImageIndex - 1 >= 0)
                setViewingImageIndex(viewingImageIndex - 1);
            }}
            size={30}
            className={`lg:hidden mr-6 ${
              viewingImageIndex !== 0
                ? "text-white cursor-pointer"
                : "text-gray"
            } `}
          />
          <h1 className="text-lg  text-center font-bold justify-center flex items-center text-white">
            {event.title}{" "}
            <span className=" text-base ml-2 opacity-50 font-normal">
              | {parseDate(event.date)}{" "}
            </span>
          </h1>
          <FiChevronRight
            onClick={() => {
              if (viewingImageIndex + 1 < event.images.length)
                setViewingImageIndex(viewingImageIndex + 1);
            }}
            size={30}
            className={`lg:hidden ml-6 ${
              viewingImageIndex !== event.images.length - 1
                ? "text-white cursor-pointer"
                : "text-gray"
            } `}
          />
        </div>
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
