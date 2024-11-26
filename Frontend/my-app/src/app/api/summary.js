import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;

export const getSummary = async (index) => {
    try {
        const response = await axios.get(`${apiUrl}/solution`, {
          params:  {index}
        }, {
          withCredentials: true,  
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
};