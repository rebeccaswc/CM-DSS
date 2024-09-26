import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;

export const getAlertList = async (sort) => {
  try {
    const response = await axios.get(`${apiUrl}/alert`,{
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