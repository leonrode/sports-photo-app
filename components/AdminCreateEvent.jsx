import { useState, useEffect, useRef } from "react";
import { FiUpload, FiMapPin, FiCalendar, FiDribbble } from "react-icons/fi";

import { useRouter } from "next/router";

import { fetchYears, createEvent } from "../_api/api";
const AdminCreateEvent = () => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [years, setYears] = useState([]);

  const router = useRouter();

  const yearRef = useRef(null);
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  const sportRef = useRef(null);

  const fileRef = useRef(null);
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
    const validFileTypes = ["image/png", "image/jpeg"];
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
          Drag and drop your files here
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
      {invalidFiles.map((file, index) => (
        <div
          key={index}
          className="pl-4 mt-4 flex items-center w-full md:w-1/2 border-l-2 border-l-red-500"
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
          className="pl-4 mt-4 flex items-center w-full md:w-1/2 border-l-2 border-l-green-500"
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
            fileRef.current.value = [];
          }}
          className="mt-4 border w-fit md:w-auto px-4 py-2 rounded-md cursor-pointer"
        >
          Clear files
        </div>
      )}

      <div className="flex mt-8 flex-col items-start">
        <div className="flex items-center">
          <span>Add to year: </span>
          <select ref={yearRef} className="ml-4 p-2">
            {years.map((year, index) => (
              <option key={index}>{year.year}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <input
            ref={titleRef}
            className=" pb-2 mt-4 outline-none bg-transparent border-b-2 border-b-black"
            placeholder="Event Title"
            type="text"
          />
        </div>
        <div className="mt-4 flex items-center relative">
          <FiMapPin size={20} className="text-black mb-2 absolute  -right-6" />
          <input
            ref={locationRef}
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
            ref={dateRef}
            // placeholder="mm / dd / yyyy"
            className="pb-2 w-full outline-none bg-light-bg border-b-2 border-b-black"
            type="date"
          />
        </div>
        <div className="mt-4 flex justify-start items-center relative">
          <FiDribbble
            size={20}
            className="text-black mb-2 absolute  -right-6"
          />
          <select ref={sportRef} className="p-2 w-full">
            <option>Skiing</option>
            <option>Cheerleading</option>
            <option>Cross Country</option>
            <option>Field hockey</option>
            <option>Football</option>
            <option>Soccer</option>
            <option>Soccer</option>
            <option>Swimming</option>
            <option>Tennis</option>
            <option>Volleyball</option>
            <option>Basketball</option>
            <option>Bowling</option>
            <option>Gymnastics</option>
            <option>Ice Hockey</option>
            <option>Indoor Track</option>
            <option>Wrestling</option>
            <option>Baseball</option>
            <option>Flag football</option>
            <option>Crew</option>
            <option>Golf</option>
            <option>Lacrosse</option>
            <option>Softball</option>
            <option>Track and Field</option>
            <option>Ultimate Frisbee</option>
          </select>
        </div>
      </div>
      <div
        onClick={async () => {
          const res = await createEvent(
            titleRef.current.value,
            yearRef.current.value,
            locationRef.current.value,
            new Date(dateRef.current.value),
            sportRef.current.value,
            files,
            (progress) => {
              console.log(progress);
            }
          );

          router.push(`/event/${res.entry.slug}`);
        }}
        className="mt-8 px-4 py-2 w-fit md:w-auto border-2 border-black rounded-md cursor-pointer"
      >
        Create event
      </div>
      <div className="my-24"></div>
    </div>
  );
};

export default AdminCreateEvent;
