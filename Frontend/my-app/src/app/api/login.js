import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});


export const logInWithPythonService = async (email, password) => {
  try {
    const response = await api.post(`/login`, {
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
