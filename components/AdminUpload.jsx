import { FiUpload } from "react-icons/fi";

import { useState } from "react";

import AdminDeleteEvent from "./AdminDeleteEvent";
import AdminDeleteImage from "./AdminDeleteImage";
const renderComponent = (index) => {
  switch (index) {
    case 0:
      return <AdminDeleteEvent />;
    case 1:
      return <AdminDeleteImage />;
  }
};

const AdminUpload = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between lg:justify-center items-center w-full md:w-1/2 ">
        <h1
          onClick={() => setActiveIndex(0)}
          className={`${
            activeIndex === 0
              ? "font-bold text-black border-b-2 border-b-blue-500"
              : "font-normal text-gray"
          } text-center mt-4 lg:mt-0 lg:ml-8 cursor-pointer`}
        >
          Delete an event
        </h1>
        <h1
          onClick={() => setActiveIndex(1)}
          className={`${
            activeIndex === 1
              ? "font-bold text-black border-b-2 border-b-blue-500"
              : "font-normal text-gray"
          } text-center mt-4 lg:mt-0 lg:ml-8 cursor-pointer`}
        >
          Delete an image from event
        </h1>
      </div>

      {renderComponent(activeIndex)}
    </>
  );
};
export default AdminUpload;
