import axios from "axios";

export const getSummary = async (index) => {
    try {
        const response = await axios.get('http://127.0.0.1:3000/solution', {
          params:  {index}
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
};