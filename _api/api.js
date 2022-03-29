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
    const res = await axios.get("/api/years");
    return res.data.years;
  } catch (e) {
    throw new Error(e);
  }
};

export { adminLogin, fetchYears };
