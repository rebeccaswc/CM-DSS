import axios from "axios";

export const getChatResponse = async (msg) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/chat',{
        "message": msg
    })
    if (response) {
        return response.data;
    }
  } catch (e) {
    console.error("error:", e);
    throw e;
  }
};