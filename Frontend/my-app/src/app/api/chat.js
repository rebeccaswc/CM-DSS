import api from './api';

export const getChatResponse = async (data) => {
  try {
    const response = await api.post('/chat',data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    data.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    if (response) {
        return response.data;
    }
  } catch (e) {
    console.error("error:", e);
    throw e;
  }
};