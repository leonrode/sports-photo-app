import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { getEvents } from "../../_api/api";

const Year = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const res = await getEvents(router.query.year);
        console.log(res);
        setEvents(res.events);
      })();
    }
  }, [router.isReady]);

  return <div></div>;
};

export default Year;
