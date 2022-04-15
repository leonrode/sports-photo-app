import Layout from "../../components/Layout";

import Link from "next/link";

import { FiChevronLeft, FiCheckSquare, FiDownload, FiX } from "react-icons/fi";

import { useState, useEffect } from "react";

import { getEvent } from "../../_api/api";

import JSZip from "jszip";

import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import EventImage from "../../components/EventImage";
import Spinner from "../../components/Spinner"
import axios from "axios";

const Event = () => {
  const [event, setEvent] = useState(null);
  const router = useRouter();
  const [zipLoading, setZipLoading] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);

  const generateZip = async () => {
    setZipLoading(true);
    if (selectedIndices.length > 0 ) {
      const zip = new JSZip();
      for (const image of event.images) {
        const blob = await axios.get(image.smaller, {responseType: "blob"});

        zip.file(image.key, blob.data)
      }
      const zipBlob = await zip.generateAsync({ type: "blob" })
      setZipLoading(false);
      saveAs(zipBlob, event.title);
    }
  };

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const slug = router.query.slug;
        const res = await getEvent(slug);

        setEvent(res.result);
      }
    })();
  }, [router.isReady]);

  return (
    <Layout>
      {event && (
        <div className="px-8 md:px-16 md:py-4 lg:px-48 lg:py-16">
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

          {selectedIndices.length === 0 && (
            <span
              onClick={() => setSelectedIndices(event.images.map((e, i) => i))}
              className="mt-4 cursor-pointer text-blue-500 w-fit flex items-center  text-xl"
            >
              <FiCheckSquare className="mr-2" size={15} /> Select all
            </span>
          )}

          {selectedIndices.length > 0 && (
            <div className="flex items-center  mt-4">
              <p className="flex items-center  text-xl">
                <FiCheckSquare className="mr-2" size={15} /> Selected{" "}
                {selectedIndices.length} photo
                {selectedIndices.length !== 1 ? "s" : ""}
              </p>
              {zipLoading ? <Spinner /> : <div
                onClick={async () => await generateZip()}
                className="cursor-pointer text-blue-500 ml-4 flex items-center"
              >
                <FiDownload className="mr-2" size={15} />
                Download all
              </div>}
              <div
                onClick={() => setSelectedIndices([])}
                className="cursor-pointer text-red-500 ml-4 flex items-center"
              >
                <FiX className="mr-2" size={15} />
                Deselect
              </div>
            </div>
          )}

          <div

            className="mt-8 grid gap-y-8 gap-x-16 md:grid-cols-3 "
          >
            {event.images.map((image, index) => (
              <EventImage
                event={event}
                selected={selectedIndices.includes(index)}
                onSelect={() => {
                  setSelectedIndices((prev) => [...prev, index]);
                }}
                onDeselect={() =>
                  setSelectedIndices((prev) => prev.filter((e) => e !== index))
                }
                key={image.key}
                link={image.link}
                smallerLink={image.smaller}
              ></EventImage>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Event;
