import { useState, useEffect } from "react";
import { FiUpload, FiMapPin, FiCalendar } from "react-icons/fi";

import { fetchYears } from "../_api/api";
const AdminCreateEvent = () => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [years, setYears] = useState([]);
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
          setInvalidFiles((prev) => [...prev, file]);
        } else {
          setFiles((prev) => [...prev, file]);
        }
      });
    }
  };

  const filePick = (files) => {
    const validFileTypes = ["image/png", "img/jpeg"];
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        if (!validFileTypes.includes(file.type)) {
          // invalid file type
          setInvalidFiles((prev) => [...prev, file]);
        } else {
          setFiles((prev) => [...prev, file]);
        }
      });
    }
  };

  useEffect(() => {
    (async () => {
      const years = await fetchYears();
      setYears(years);
    })();
  }, []);
  return (
    <>
      <div
        onDrop={fileDrop}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDragEnter={dragEnter}
        className={`border-dashed border-[3px] ${
          isDraggingOver ? "border-blue-500" : "border-black"
        } mt-24 w-1/2 h-96 flex flex-col items-center justify-center`}
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
          Drag and drop your files here
        </h1>
      </div>
      <div className="mt-4 flex items-center">
        <span>Or choose files: </span>
        <input
          type="file"
          className="ml-2 w-[80px]"
          accept="image/png, image/jpeg"
          multiple
          onChange={(e) => {
            filePick(e.target.files);
          }}
        />
      </div>
      {invalidFiles.map((file, index) => (
        <div
          key={index}
          className="pl-4 mt-4 flex items-center w-1/2 border-l-2 border-l-red-500"
        >
          <h3 className="text-red-500">
            <span className="font-bold">{file.name}</span> is an invalid type (
            {file.type}). Valid types are png and jpg/jpeg{" "}
          </h3>
        </div>
      ))}
      {files.map((file, index) => (
        <div
          key={index}
          className="pl-4 mt-4 flex items-center w-1/2 border-l-2 border-l-green-500"
        >
          <h3 className="text-green-500">
            <span className="font-bold">{file.name}</span> successfully uploaded
          </h3>
        </div>
      ))}
      {(files.length > 0 || invalidFiles.length > 0) && (
        <div
          onClick={() => {
            setFiles([]);
            setInvalidFiles([]);
          }}
          className="mt-4 border px-4 py-2 rounded-md cursor-pointer"
        >
          Clear files
        </div>
      )}

      <div className="flex mt-8 flex-col items-start">
        <div className="flex items-center">
          <span>Add to year: </span>
          <select className="ml-4">
            {years.map((year, index) => (
              <option key={index}>{year.year}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <input
            className=" pb-2 mt-4 outline-none bg-transparent border-b-2 border-b-black"
            placeholder="Event Title"
            type="text"
          />
        </div>
        <div className="mt-4 flex items-center relative">
          <FiMapPin size={20} className="text-black mb-2 absolute  -right-6" />
          <input
            className="pb-2 outline-none bg-transparent border-b-2 border-b-black"
            placeholder="Location"
            type="text"
          />
        </div>
        <div className="mt-4 flex items-center relative">
          <FiCalendar
            size={20}
            className="text-black mb-2 absolute  -right-6"
          />
          <input
            className="pb-2  outline-none bg-transparent border-b-2 border-b-black"
            placeholder="Location"
            type="date"
          />
        </div>
      </div>
    </>
  );
};

export default AdminCreateEvent;
