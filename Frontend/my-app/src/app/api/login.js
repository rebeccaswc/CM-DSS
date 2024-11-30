import api from './api';


export const logInWithPythonService = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    if (response && response.data) {
      // document.cookie = `access_token=${response.data.access_token}; Path=/; Secure; SameSite=Strict`;
      localStorage.setItem('access_token', response.data.token);
      console.log(response.data.token)
      return response.data;
    }
  } catch (e) {
    console.error("Invalid credentials", e);
    throw e;
  }
};
