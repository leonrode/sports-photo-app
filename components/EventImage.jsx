import {
  FiSquare,
  FiCheck,
  FiCheckSquare,
  FiShare2,
  FiDownload,
  FiMaximize2,
} from "react-icons/fi";

import FullscreenImage from "./FullscreenImage";

import { useState } from "react";

const EventImage = ({
  selected,
  onSelect,
  onDeselect,
  link,
  smallerLink,
  event,
}) => {
  const [fs, setFs] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative h-fit">
      <img className="rounded-xl " src={smallerLink}></img>
      <div
        className={`py-2 group-hover:visible group-hover:opacity-100 ${
          selected
            ? "visible opacity-100"
            : "opacity-100 lg:opacity-0 visible lg:invisible"
        } transition-all px-4 flex items-end  justify-between bottom-0 bg-gradient-to-t from-black to-[rgba(0, 0, 0, 0.4)] rounded-bl-xl rounded-br-xl absolute w-full `}
      >
        <div className="flex items-center w-1/5 md:w-1/2 lg:w-1/4 pb-2 justify-between">
          <div>
            {!selected ? (
              <FiSquare
                onClick={() => {
                  onSelect();
                }}
                className=" cursor-pointer text-white"
                size={20}
              />
            ) : (
              <FiCheckSquare
                onClick={() => {
                  onDeselect();
                }}
                className="cursor-pointer text-white"
                size={20}
              />
            )}
          </div>
          <div>
            {copied ? (
              <FiCheck size={20} className="text-white" />
            ) : (
              <FiShare2
                onClick={async () => {
                  await navigator.clipboard.writeText(link);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1000 * 5); // 5 sec
                }}
                className="text-white cursor-pointer"
                size={20}
              />
            )}
          </div>
          <a href={link} download={link}>
            <FiDownload className="cursor-pointer text-white " size={20} />
          </a>
        </div>
        <div className="flex items-center pb-2">
          <FiMaximize2
            onClick={() => setFs(true)}
            className="aspect-square cursor-pointer text-white"
            size={20}
          />
        </div>
      </div>
      {fs && (
        <FullscreenImage
          event={event}
          link={link}
          smallerLink={smallerLink}
          toClose={() => setFs(false)}
        />
      )}
    </div>
  );
};

export default EventImage;
