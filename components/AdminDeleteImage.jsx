import { useState, useEffect, useRef } from "react";
import { FiUpload, FiMapPin, FiCalendar, FiDribbble } from "react-icons/fi";

import { useRouter } from "next/router";

import SportDropdown from "./SportDropdown";

import { fetchYears, getEvents, deleteImage } from "../_api/api";

import { sortEventsBySearch, parseDate } from "../lib/utils";

const AdminDeleteImage = () => {
  const [search, setSearch] = useState("");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [events, setEvents] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const years = await fetchYears();
      if (years.length > 0) {
        setSelectedYear(years[0].year);
      }
      setYears(years);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedYear) {
        const res = await getEvents(selectedYear);
        setSelectedIndex(null);
        setEvents(res.events);
      }
    })();
  }, [selectedYear]);

  useEffect(() => {
    setEvents(sortEventsBySearch(events, search));
  }, [search]);

  const refreshEvents = async () => {
    const res = await getEvents(selectedYear);
    setEvents(res.events);
  };

  return (
    <div className="w-full p-2 md:p-0 flex flex-col items-center">
      <div className="flex mt-8 flex-col items-start">
        <div className="flex items-center">
          <span>Add to year: </span>
          <select
            onChange={(e) => setSelectedYear(e.target.value)}
            className="ml-4 p-2"
          >
            {years.map((year, index) => (
              <option key={index}>{year.year}</option>
            ))}
          </select>
        </div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for an event..."
          className="mt-4 w-full outline-none border-b-2 border-b-black bg-transparent pb-2"
        ></input>
        <div className="my-4"></div>
        {events.map((event, index) => (
          <div
            onClick={() =>
              setSelectedIndex(selectedIndex === index ? -1 : index)
            }
            key={event.slug}
            className={`border-2 ${
              selectedIndex === index ? "border-blue-500" : "border-transparent"
            } transition cursor-pointer hover:border-blue-500 bg-slate-100 w-full mb-4 rounded-lg h-20 flex`}
          >
            <img
              className="  rounded-lg rounded-bl-lg h-full"
              src={event.images[0] ? event.images[0].link : "/placeholder.png"}
            ></img>
            <div className="px-4 w-full flex items-center">
              <div>
                <h1 className="font-bold">{event.title}</h1>
                <p>{event.location}</p>
                <p className="text-blue-500">{parseDate(event.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events[selectedIndex] && (
        <>
          <div
            onClick={async () => {
              if (selectedIndex !== -1 && selectedImageIndex !== -1) {
                console.log(events[selectedIndex].slug, events[selectedIndex].images[selectedImageIndex].key)
                const res = await deleteImage(events[selectedIndex].slug, events[selectedIndex].images[selectedImageIndex].key);
                if (res) {
                  setSelectedImageIndex(-1);
                  await refreshEvents();
                }
              }
            }}
            className="mt-8 px-4 py-2 w-fit md:w-auto border-2 border-black rounded-md cursor-pointer"
          >
            Delete{" "}
            {selectedImageIndex !== -1 && <span className="font-bold">{events[selectedIndex]?.images[selectedImageIndex].key}</span>}
          </div>
          <span className="my-12 border-2 border-black w-24"></span>
          <div className="px-24 grid gap-y-8 gap-x-16 md:grid-cols-3">
            {events[selectedIndex].images.map((img, index) => (
              <img
                onClick={() => setSelectedImageIndex(index)}
                className={`${
                  index === selectedImageIndex
                    ? "border-blue-500"
                    : "border-transparent"
                } cursor-pointer rounded-lg border-[3px]  transition`}
                src={img.link}
              ></img>
            ))}
          </div>
        </>
      )}
      {/* <div
        onClick={async () => {

            if (selectedIndex !== -1) {
              const res = await deleteEvent(events[selectedIndex].slug);
              if (res) {
                await refreshEvents();
              }
            }
        }}
        className="mt-8 px-4 py-2 w-fit md:w-auto border-2 border-black rounded-md cursor-pointer"
      >
        Delete <span className="font-bold">{events[selectedIndex]?.title}</span>
      </div> */}
      <div className="my-24"></div>
    </div>
  );
};

export default AdminDeleteImage;
