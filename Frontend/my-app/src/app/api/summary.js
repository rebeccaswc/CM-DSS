import axios from "axios";
const apiUrl = process.env.BACKEND_API;

export const getSummary = async (index) => {
    try {
        const response = await axios.get(`${apiUrl}/solution`, {
          params:  {index}
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
};