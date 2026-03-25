import axios from "axios";

const API_URL = "http://localhost:8080/api/public/doctors";

export const getDoctors = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
