import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { getEvents } from "../../_api/api";

import Layout from "../../components/Layout";

import Event from "../../components/Event";

import { FiChevronLeft } from "react-icons/fi";

import Link from "next/link";

import { sortEventsByDate } from "../../lib/utils";

const Year = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [recentFirst, setRecentFirst] = useState(true);
  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const res = await getEvents(router.query.year);
        const sorted = sortEventsByDate(res.events, recentFirst);
        console.log(sorted);
        setEvents(sorted);
      })();
    }
  }, [router.isReady, recentFirst]);

  return (
    <Layout>
      {events && (
        <div className="md:px-16 md:py-4 lg:px-48 lg:py-16">
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
            <select className="ml-4 mt-8 bg-transparent text-xl">
              <option>Skiing</option>
              <option>asdasd</option>
            </select>
          </div>

          <div className="mt-8 grid gap-y-8 gap-x-16 md:grid-cols-2 ">
            {events.map((event) => (
              <Event key={event.slug} event={event} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Year;
