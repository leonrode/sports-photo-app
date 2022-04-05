import Layout from "../../components/Layout";

import Link from "next/link";

import { FiChevronLeft, FiCheckSquare, FiDownload,FiX } from "react-icons/fi";

import { useState, useEffect, useRef } from "react";

import { getEvent } from "../../_api/api";

import JSZip from "jszip";
import { saveAs } from "file-saver"
import { useRouter } from "next/router";
import EventImage from "../../components/EventImage";

const Event = () => {
  const [event, setEvent] = useState(null);
  const router = useRouter();

  const [selectedIndices, setSelectedIndices] = useState([]);
  const imgContainerRef = useRef(null);
  const generateZip = async () => {

    if (selectedIndices.length > 0 && imgContainerRef.current) {
      const zip = new JSZip();
      const children = imgContainerRef.current.children;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      for (let i = 0; i < children.length; i++) {
        const imgCont = children[i];

        const img = imgCont.childNodes[0];
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        const blob = await new Promise(resolve => canvas.toBlob(resolve));
        zip.file(event.images[i].key, blob);

      }

      const zipBlob = await zip.generateAsync({type: "blob"})
      saveAs(zipBlob, event.title)


    }
  }


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
        <div className="md:px-16 md:py-4 lg:px-48 lg:py-16">
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

          {selectedIndices.length > 0 && (
            <div className="flex items-center  mt-4">
              <p className="flex items-center  text-xl">
                <FiCheckSquare className="mr-2" size={15} /> Selected{" "}
                {selectedIndices.length} photo
                {selectedIndices.length !== 1 ? "s" : ""}
              </p>
              <div onClick={async () => await generateZip()} className="cursor-pointer text-blue-500 ml-4 flex items-center">
                <FiDownload className="mr-2" size={15} />
                Download all
              </div>
              <div onClick={() => setSelectedIndices([])} className="cursor-pointer text-red-500 ml-4 flex items-center">
                <FiX className="mr-2" size={15} />
              Deselect
                </div>
            </div>
          )}

        <div ref={imgContainerRef} className="mt-8 grid gap-y-8 gap-x-16 md:grid-cols-3 ">
            {event.images.map((image, index) => (
              <EventImage
                selected={selectedIndices.includes(index)}
                onSelect={() => {

                  setSelectedIndices((prev) => [...prev, index]);
                }}
                onDeselect={() =>
                  setSelectedIndices((prev) => prev.filter((e) => e !== index))
                }
                key={image.link}
                link={image.link}
              ></EventImage>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Event;
