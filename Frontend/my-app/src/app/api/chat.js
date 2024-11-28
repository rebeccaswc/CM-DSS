import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;

export const getChatResponse = async (msg) => {
  try {
    const response = await axios.post(`${apiUrl}/chat`,{
        "message": msg,
        withCredentials: true
      });
    if (response) {
        return response.data;
    }
  } catch (e) {
    console.error("error:", e);
    throw e;
  }
};