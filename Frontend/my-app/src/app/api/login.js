import api from './api';

export const logInWithPythonService = async (email, password) => {
  try {
    const response = await api.post(`/login`, {
      email,
      password,
    });

    if (response) {
      document.cookie = `access_token_cookie=${response.data.access_token_cookie}; Path=/; Secure; SameSite=None`;
      return response.data;
    }
  } catch (e) {
    console.error("Invalid credentials", e);
    throw e;
  }
};
