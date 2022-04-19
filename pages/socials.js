import Layout from "../components/Layout";

import Link from "next/link";

import { FiCalendar, FiInstagram, FiCamera, FiMail } from "react-icons/fi";

const Socials = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-3/4">
        <h1 className="text-3xl font-bold mb-8">Socials</h1>
        <div className="border-[1px] w-16 border-gray mb-8"></div>
        <Link href="https://calendar.google.com/calendar/u/0?cid=c2NhcnNkYWxlc2Nob29scy5vcmdfbWY4aTRhMHAyN2oyY2FvcnB2bmlpcWlyYmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ">
          <h1 className="text-blue-500 flex items-center cursor-pointer text-3xl">
            <FiCalendar size={30} className="mr-4" />
            Schedule
          </h1>
        </Link>
        <Link href="https://www.instagram.com/elliottz_photo/">
          <h1 className="mt-8 text-blue-500 flex items-center cursor-pointer text-3xl">
            <FiInstagram size={30} className="mr-4" />
            Instagram
          </h1>
        </Link>
        <Link href="https://vsco.co/elliottzphoto/gallery">
          <h1 className="mt-8 text-blue-500 flex items-center cursor-pointer text-3xl">
            <FiCamera size={30} className="mr-4" />
            VSCO
          </h1>
        </Link>
        <Link href="mailto:zelliott319@gmail.com">
          <h1 className="mt-8 text-blue-500 flex items-center cursor-pointer text-3xl">
            <FiMail size={30} className="mr-4" />
            Email me
          </h1>
        </Link>
      </div>
    </Layout>
  );
};

export default Socials;
