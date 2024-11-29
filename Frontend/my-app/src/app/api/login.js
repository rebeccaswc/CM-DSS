import api from './api';

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
