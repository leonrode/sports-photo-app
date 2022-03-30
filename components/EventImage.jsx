import {
  FiSquare,
  FiCheckSquare,
  FiShare2,
  FiDownload,
  FiMaximize2,
} from "react-icons/fi";

const EventImage = ({ link }) => {
  return (
    <div className="group relative h-fit">
      <img className="rounded-xl " src={link}></img>
      <div className="group-hover:visible group-hover:opacity-100 opacity-0 invisible transition-all px-2 flex items-center justify-between bottom-0 bg-gradient-to-t from-black to-[rgba(0, 0, 0, 0.4)] rounded-bl-xl rounded-br-xl absolute w-full h-1/5">
        <div className="flex items-center w-1/4 justify-between">
          <FiSquare className="cursor-pointer text-white" size={20} />
          <FiShare2 className="cursor-pointer text-white" size={20} />
          <FiDownload className="cursor-pointer text-white" size={20} />
        </div>
        <div className="flex items-center">
          <FiMaximize2 className="cursor-pointer text-white" size={20} />
        </div>
      </div>
    </div>
  );
};

export default EventImage;
