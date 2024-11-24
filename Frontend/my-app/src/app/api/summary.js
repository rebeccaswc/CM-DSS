import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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