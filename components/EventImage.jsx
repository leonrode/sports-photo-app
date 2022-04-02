import {
  FiSquare,
  FiCheckSquare,
  FiShare2,
  FiDownload,
  FiMaximize2,
} from "react-icons/fi";


const EventImage = ({ selected, onSelect, onDeselect, link }) => {

  return (
    <div className="group relative h-fit">
      <img className="rounded-xl " src={link}></img>
      <div className={`group-hover:visible group-hover:opacity-100 ${selected ? "visible opacity-100" : "opacity-0 invisible"} transition-all px-4 flex items-end pb-4 lg:pb-2 justify-between bottom-0 bg-gradient-to-t from-black to-[rgba(0, 0, 0, 0.4)] rounded-bl-xl rounded-br-xl absolute w-full h-1/5`}>
        <div className="flex items-center w-1/5 md:w-1/2 lg:w-1/4 pb-2  justify-between">
          {!selected ? (
            <FiSquare
              onClick={() => {
                onSelect();

              }}
              className="aspect-square w-full cursor-pointer text-white"
              size={20}
            />
          ) : (
            <FiCheckSquare
              onClick={() => {
                onDeselect();
              }}
              className="aspect-square w-full cursor-pointer text-white"
              size={20}
            />
          )}
          <FiShare2
            className="aspect-square w-full cursor-pointer text-white lg:ml-2"
            size={20}
          />
          <FiDownload
            className="aspect-square w-full cursor-pointer text-white lg:ml-2"
            size={20}
          />
        </div>
        <div className="flex items-center pb-2">
          <FiMaximize2
            className="aspect-square cursor-pointer text-white"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default EventImage;
