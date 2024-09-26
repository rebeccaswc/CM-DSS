import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
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
