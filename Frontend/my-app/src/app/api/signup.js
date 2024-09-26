import axios from "axios";
const apiUrl = process.env.BACKEND_API;
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const signUpWithPythonService = async (email, password) => {
  try {
    const response = await api.post(`${apiUrl}/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    console.error("Sign Up error", e);
    throw e;
  }
};
