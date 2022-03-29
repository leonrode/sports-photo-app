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

export { adminLogin };
