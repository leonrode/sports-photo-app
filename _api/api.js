import axios from "axios";

const adminLogin = async (accessCode) => {
  try {
    const res = await axios.post("/api/auth/authorize", {
      access_code: accessCode,
    });
    return res.status === 200;
  } catch (e) {
    return false;
  }
};

const fetchYears = async () => {
  try {
    const res = await axios.get("/api/year/get");
    return res.data.years;
  } catch (e) {
    throw new Error(e);
  }
};

const createEvent = async (title, year, location, date, sport, files) => {
  const data = new FormData();
  Array.from(files).forEach((file) => {
    data.append("file", file);
  });

  data.set("title", title);
  data.set("year", year);
  data.set("location", location);
  data.set("date", date);
  data.set("sport", sport);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const res = await axios.post("/api/event/create", data, config);
  return res.data;
};

const createYear = async (year, file) => {
  const data = new FormData();
  data.set("year", year);
  data.set("file", file);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const res = await axios.post("/api/year/create", data, config);
  return res.data;
};

const getEvents = async (year) => {
  const res = await axios.get(`/api/year/events?year=${year}`);
  return res.data;
};

const getEvent = async (slug) => {
  const res = await axios.get(`/api/event/get?slug=${slug}`);

  return res.data;
};

export { adminLogin, fetchYears, createEvent, createYear, getEvents, getEvent };
