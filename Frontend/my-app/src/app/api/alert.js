import axios from "axios";

export const getAlertList = async (sort) => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/alert',{
      params: {sort}
    });
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