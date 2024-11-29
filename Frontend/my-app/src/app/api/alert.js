import api from './api';

export const getAlertList = async (sort) => {
  try {
    const response = await api.get(`/alert`,{
      params: {sort}    });
    if (Array.isArray(response.data)) {
      return (response.data);
    } else {
      console.error('Data fetched is not an array:', response.data);
      return([]);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return([]);
  }
};