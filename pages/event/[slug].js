import Layout from "../../components/Layout";

import Link from "next/link";

import { FiChevronLeft } from "react-icons/fi";

import { useState, useEffect } from "react";

import { getEvent } from "../../_api/api";

import { useRouter } from "next/router";
import EventImage from "../../components/EventImage";
const Event = () => {
  const [event, setEvent] = useState(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        console.log(router.query.slug);
        const slug = router.query.slug;
        const res = await getEvent(slug);

        setEvent(res.result);
      }
    })();
  }, [router.isReady]);

  return (
    <Layout>
      {event && (
        <div className="px-64 py-16">
          <div className="flex items-center">
            <FiChevronLeft size={20} className="text-gray" />{" "}
            <Link href={`/year/${event.year}`}>
              <span className="cursor-pointer text-gray font-lgiht">
                back to {event.year} events
              </span>
            </Link>
          </div>

          <h1 className="text-2xl mt-8">
            Browsing all photos from{" "}
            <span className="font-bold">{event.title}</span>
          </h1>

          <div className="mt-8 grid gap-y-8 gap-x-16 grid-cols-3">
            {event.images.map((image) => (
              <EventImage key={image.link} link={image.link}></EventImage>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Event;
