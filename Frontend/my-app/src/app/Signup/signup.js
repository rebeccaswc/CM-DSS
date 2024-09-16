import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
export const signUpWithPythonService = async (email, password) => {
  try {
    const response = await api.post("/signup", {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    console.error("Sign Up error", e);
    throw e;
  }
};
