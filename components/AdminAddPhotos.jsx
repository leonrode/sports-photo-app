import { useState, useEffect, useRef } from "react";
import { FiUpload, FiMapPin, FiCalendar, FiDribbble } from "react-icons/fi";

import { useRouter } from "next/router";

import SportDropdown from "./SportDropdown";

import { fetchYears, getEvents, addPhotosToEvent } from "../_api/api";

import { sortEventsBySearch } from "../lib/utils";

const AdminAddPhotos = () => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const [search, setSearch] = useState("");

  const [events, setEvents] = useState([]);

  const router = useRouter();

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
      if (years.length > 0) {setSelectedYear(years[0].year);}
      setYears(years);
    })();
  }, []);

  useEffect(() => {
      (async () => {
          if (selectedYear) {
              const res = await getEvents(selectedYear);
              setSelectedIndex(null)
              setEvents(res.events);
          }
      })()

  }, [selectedYear])

  useEffect(() => {

    setEvents(sortEventsBySearch(events, search))

  }, [search])
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
          <select onChange={(e) => setSelectedYear(e.target.value)} className="ml-4 p-2">
            {years.map((year, index) => (
              <option key={index}>{year.year}</option>
            ))}
          </select>
        </div>
        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search for an event..." className="mt-4 w-full outline-none border-b-2 border-b-black bg-transparent pb-2" ></input>
        <div className="my-4"></div>
        {events.map((event, index) => <div onClick={() => setSelectedIndex(index)} key={event.slug} className={`border-2 ${selectedIndex === index ? "border-blue-500" : "border-transparent"} transition cursor-pointer hover:border-blue-500 bg-slate-100 w-full mb-4 rounded-lg h-16 flex`}>

            <img className="  rounded-lg rounded-bl-lg h-full" src={event.images[0] ? event.images[0].link : "/placeholder.png"}></img>
            <div className="px-4 w-full flex items-center">
                <div>
                <h1 className="font-bold">{event.title}</h1>
                <p>{event.location}</p>
                </div>
            </div>
        </div>)}
      </div>
      <div
        onClick={async () => {

            if (selectedIndex !== null) {
              const res = await addPhotosToEvent(files, events[selectedIndex].slug);
              router.push(`/event/${events[selectedIndex].slug}`)
            }
        }}
        className="mt-8 px-4 py-2 w-fit md:w-auto border-2 border-black rounded-md cursor-pointer"
      >
        Add photos to <span className="font-bold">{events[selectedIndex]?.title}</span>
      </div>
      <div className="my-24"></div>
    </div>);
}

export default AdminAddPhotos;