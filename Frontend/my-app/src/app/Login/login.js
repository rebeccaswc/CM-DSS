import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});

export const logInWithPythonService = async (email, password) => {
  try {
    const response = await api.post("/login", {
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