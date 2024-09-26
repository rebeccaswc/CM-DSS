import axios from "axios";
const apiUrl = process.env.BACKEND_API;
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});


export const logInWithPythonService = async (email, password) => {
  try {
    const response = await api.post(`${apiUrl}/login`, {
      email,
      password,
    });

    if (response) {
      return response.data;
    }
  } catch (e) {
    console.error("Invalid credentials", e);
    throw e;
  }
};
