import { FiUpload } from "react-icons/fi";

import { useState } from "react";

import AdminCreateYear from "./AdminCreateYear";
import AdminCreateEvent from "./AdminCreateEvent";
const AdminUpload = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="flex justify-center items-center w-1/2">
        <h1
          onClick={() => setActiveIndex(0)}
          className={`${
            activeIndex === 0
              ? "font-bold text-black border-b-2 border-b-blue-500"
              : "font-normal text-gray"
          } cursor-pointer`}
        >
          Create year folder
        </h1>
        <h1
          onClick={() => setActiveIndex(1)}
          className={`${
            activeIndex === 1
              ? "font-bold text-black border-b-2 border-b-blue-500"
              : "font-normal text-gray"
          } ml-8 cursor-pointer`}
        >
          Add a new event
        </h1>
      </div>
      {activeIndex === 0 ? <AdminCreateYear /> : <AdminCreateEvent />}
    </>
  );
};
export default AdminUpload;
