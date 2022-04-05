import { FiUpload } from "react-icons/fi";

import { useState } from "react";

import AdminCreateYear from "./AdminCreateYear";
import AdminCreateEvent from "./AdminCreateEvent";
import AdminAddPhotos from "./AdminAddPhotos";
import AdminDeleteEvent from "./AdminDeleteEvent";

const renderComponent = (index) => {
  switch (index) {
    case 0:
      return <AdminCreateYear />;
    case 1:
      return <AdminCreateEvent />;
    case 2:
      return <AdminAddPhotos />;
    case 3:
      return <AdminDeleteEvent />;
  }
};

const AdminUpload = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="flex justify-center items-center w-full md:w-1/2 ">
        <h1
          onClick={() => setActiveIndex(0)}
          className={`${
            activeIndex === 0
              ? "font-bold text-black border-b-2 border-b-blue-500"
              : "font-normal text-gray"
          } text-center cursor-pointer`}
        >
          Create year folder
        </h1>
        <h1
          onClick={() => setActiveIndex(1)}
          className={`${
            activeIndex === 1
              ? "font-bold text-black border-b-2 border-b-blue-500"
              : "font-normal text-gray"
          } text-center  ml-8 cursor-pointer`}
        >
          Add a new event
        </h1>
        <h1
          onClick={() => setActiveIndex(2)}
          className={`${
            activeIndex === 2
              ? "font-bold text-black border-b-2 border-b-blue-500"
              : "font-normal text-gray"
          } text-center  ml-8 cursor-pointer`}
        >
          Add photos to an event
        </h1>
        <h1
          onClick={() => setActiveIndex(3)}
          className={`${
            activeIndex === 3
              ? "font-bold text-black border-b-2 border-b-blue-500"
              : "font-normal text-gray"
          } text-center  ml-8 cursor-pointer`}
        >
          Delete an event
        </h1>
      </div>

      {renderComponent(activeIndex)}
    </>
  );
};
export default AdminUpload;
