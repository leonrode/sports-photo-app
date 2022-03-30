import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { useRouter } from "next/router";
import { createYear } from "../_api/api";
const AdminCreateYear = () => {
  const [file, setFile] = useState(null);
  const [invalidFile, setInvalidFile] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const router = useRouter();

  const fileRef = useRef(null);
  const yearRef = useRef(null);
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
    const validFileTypes = ["image/png", "img/jpeg"];
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        if (!validFileTypes.includes(file.type)) {
          // invalid file type
          setInvalidFile(file);
          setFile(null);
        } else {
          setFile(file);
          setInvalidFile(null);
        }
      });
    }
  };

  const filePick = (files) => {
    const validFileTypes = ["image/png", "image/jpeg"];
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        if (!validFileTypes.includes(file.type)) {
          // invalid file type
          setInvalidFile(file);
          setFile(null);
        } else {
          setFile(file);
          setInvalidFile(null);
        }
      });
    }
  };
  return (
    <div className="w-full p-2 md:p-0 flex flex-col items-center">
      <div
        onDrop={fileDrop}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDragEnter={dragEnter}
        className={`border-dashed border-[3px] ${
          isDraggingOver ? "border-blue-500" : "border-black"
        } mt-24 w-full md:w-1/2 h-96 flex flex-col items-center justify-center `}
      >
        <FiUpload
          size={45}
          className={`${isDraggingOver ? "text-blue-500" : "text-black"}
        `}
        />
        <h1
          className={`text-2xl mt-12 font-normal ${
            isDraggingOver ? "text-blue-500" : "text-black"
          }`}
        >
          Drag and drop a cover image
        </h1>
      </div>
      <input
        ref={fileRef}
        type="file"
        className="mt-4"
        accept="image/png, image/jpeg"
        multiple
        onChange={(e) => {
          filePick(e.target.files);
        }}
      />

      {invalidFile && (
        <div className="pl-4 mt-4 flex items-center w-full md:w-1/2 border-l-2 border-l-red-500">
          <h3 className="text-red-500">
            <span className="font-bold">{invalidFile.name}</span> is an invalid
            type ({invalidFile.type}). Valid types are png and jpg/jpeg{" "}
          </h3>
        </div>
      )}
      {file && (
        <div className="pl-4 mt-4 flex items-center w-full md:w-1/2 border-l-2 border-l-green-500">
          <h3 className="text-green-500">
            <span className="font-bold">{file.name}</span> successfully uploaded
          </h3>
        </div>
      )}

      <input
        ref={yearRef}
        className="my-4 outline-none bg-transparent border-b-2 border-b-black"
        type="number"
        placeholder="Year"
      ></input>
      <div
        onClick={async () => {
          if (file && yearRef.current.value !== "") {
            const res = await createYear(yearRef.current.value, file);
            router.push(`/year/${res.entry.year}`);
          }
        }}
        className="mt-8 px-4 py-2 w-fit md:w-auto border-2 border-black rounded-md cursor-pointer"
      >
        Create year
      </div>
      <div className="my-24"></div>
    </div>
  );
};

export default AdminCreateYear;
