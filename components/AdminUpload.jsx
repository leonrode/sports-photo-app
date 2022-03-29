import { FiUpload } from "react-icons/fi";

import { useState } from "react";

const AdminUpload = () => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    setIsDraggingOver(true);
    e.preventDefault();
  };

  const dragLeave = (e) => {
    setIsDraggingOver(false);
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
  };

  return (
    <>
      <div
        onDrop={fileDrop}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDragEnter={dragEnter}
        className={`border-dashed border-2 border-rose-500 w-1/2 h-96 flex flex-col items-center justify-center`}
      >
        <FiUpload size={45} className="text-gray" />
        <h1 className="text-2xl mt-12 font-normal">
          Drag and drop your files here
        </h1>
      </div>
    </>
  );
};
export default AdminUpload;
