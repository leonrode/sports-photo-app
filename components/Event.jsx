import { FiMapPin, FiChevronRight, FiCalendar } from "react-icons/fi";

import { parseDate } from "../lib/utils";

import Link from "next/link";

const Event = ({ event }) => {
  return (
    <Link href={`/event/${event.slug}`}>
      <div className="group relative h-fit w-fit cursor-pointer">
        <img
          className="rounded-xl "
          src={event.images[0] ? event.images[0].smaller : "/placeholder.png"}
        ></img>
        <div className="py-2 flex justify-between items-center px-4 absolute bottom-0 rounded-br-lg rounded-bl-lg w-full bg-white">
          <div>
            <h1 className="font-bold text-xl">{event.title}</h1>
            <div className="my-[4px] flex items-center">
              <FiMapPin className="text-blue-500" size={20} />
              <h3 className="text-blue-500 ml-[4px] text-md">
                {event.location}
              </h3>
            </div>
            <div className="flex items-center">
              <FiCalendar className="text-gray" size={20} />

              <h3 className="ml-[4px] text-gray">{parseDate(event.date)}</h3>
            </div>
          </div>
          <FiChevronRight size={35} />
        </div>
      </div>
    </Link>
  );
};

export default Event;
