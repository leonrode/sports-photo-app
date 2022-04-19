import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { getEvents } from "../../_api/api";

import Layout from "../../components/Layout";
import Event from "../../components/Event";
import SportFilter from "../../components/SportFilter";
import { FiChevronLeft } from "react-icons/fi";

import Link from "next/link";

import {
  sortEventsByDate,
  filterEventsBySport,
  filterEventsBySearch,
} from "../../lib/utils";

const Year = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [originalEvents, setOrigiginalEvents] = useState([]);
  const [recentFirst, setRecentFirst] = useState(true);
  const [sport, setSport] = useState("All Sports");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const res = await getEvents(router.query.year);
        setOrigiginalEvents(res.events);
        const sorted = sortEventsByDate(res.events, recentFirst);
        const filtered = filterEventsBySport(sorted, sport);
        setEvents(filtered);
      })();
    }
  }, [router.isReady, recentFirst, sport]);

  useEffect(() => {
    if (search !== "") {
      const filtered = filterEventsBySearch(events, search);
      setEvents(filtered);
    }
  }, [search]);

  return (
    <Layout>
      {events && (
        <div className="px-8 md:px-16 md:py-4 lg:px-48 lg:py-16">
          <Link href="/">
            <div className="cursor-pointer flex items-center">
              <FiChevronLeft size={20} className="text-gray" />
              <span>back to all years</span>
            </div>
          </Link>
          <h1 className="my-8 font-bold text-3xl">
            Browsing {router.query.year}
          </h1>

          <input
            className="border-b-[1px] border-b-gray bg-transparent outline-none w-full pb-2 text-xl"
            type="text"
            placeholder="Search for an event..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>

          <div className="flex items-center">
            <select
              onChange={(e) => {
                if (e.target.value === "Most recent first") {
                  setRecentFirst(true);
                } else {
                  setRecentFirst(false);
                }
              }}
              className="mt-8 bg-transparent text-xl"
            >
              <option>Most recent first</option>
              <option>Oldest first</option>
            </select>

            <SportFilter
              events={originalEvents.map((e) => e.sport)}
              _onChange={(value) => setSport(value)}
              className="ml-4 mt-8 bg-transparent text-xl"
            />
          </div>

          <div className="mt-8 grid gap-y-8 gap-x-16 md:grid-cols-2 ">
            {events.map((event) => (
              <Event key={event.slug} event={event} />
            ))}
          </div>
          <div className="my-8"></div>
        </div>
      )}
    </Layout>
  );
};

export default Year;
