import api from './api';

export const getSummary = async (index) => {
    try {
        const response = await api.get(`/solution`, {
          params:  {index}        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
};