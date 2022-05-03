import { FiX } from "react-icons/fi";

import {
  FiShare2,
  FiDownload,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { useState, useEffect, useRef } from "react";

import { parseDate } from "../lib/utils";

const FullscreenImage = ({ event, link, smallerLink, toClose, imageIndex }) => {
  const [copied, setCopied] = useState(false);
  const imgRef = useRef(null);
  const [viewingImageIndex, setViewingImageIndex] = useState(imageIndex);
  const [imgDimensions, setImgDimensions] = useState(null);
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
    <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-opaque ">
      <div
        className={`h-screen lg:block flex flex-col ${
          imgDimensions &&
          (imgDimensions.width > imgDimensions.height
            ? "justify-center"
            : "justify-start")
        } md:justify-center items-center`}
      >
        <FiX
          className="hidden md:block md:mb-8 cursor-pointer lg:mt-16 lg:mx-64 text-white"
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
            onLoad={(e) =>
              setImgDimensions({
                width: e.target.width,
                height: e.target.height,
              })
            }
            ref={imgRef}
            className={`max-w-full max-h-fit md:h-auto mt-0 md:mt-0`}
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

        <div className="justify-center flex items-center mt-[2px] lg:mt-4">
          {/* <FiChevronLeft
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
          /> */}
          <h1 className="text-lg  text-center font-bold justify-center flex items-center text-white">
            {event.title}{" "}
            <span className=" text-base ml-2 opacity-50 font-normal">
              | {parseDate(event.date)}{" "}
            </span>
          </h1>
          {/* <FiChevronRight
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
          /> */}
        </div>
        <div className=" mt-[2px] lg:mt-4 mb-[2px] lg:mb-4 flex items-center  text-white justify-center">
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
        <FiX
          className="md:hidden cursor-pointer lg:mt-16 lg:mx-64 text-white"
          size={30}
          onClick={() => {
            setCopied(false);
            toClose();
          }}
        />
      </div>
    </div>
  );
};

export default FullscreenImage;
