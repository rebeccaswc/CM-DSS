import api from './api';

export const getChatResponse = async (msg) => {
  try {
    const response = await api.post(`/chat`,{
        "message": msg      });
    if (response) {
        return response.data;
    }
  } catch (e) {
    console.error("error:", e);
    throw e;
  }
};