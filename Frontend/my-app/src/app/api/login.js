import api from './api';

function setAccessToken(token) {
  const now = new Date();
  const expiry = now.getTime() + 30 * 24 * 60 * 60 * 1000; // 30天後
  const data = {
    token,
    expiry,
  };

  localStorage.setItem('access_token', JSON.stringify(data));
}

export const logInWithPythonService = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    if (response && response.data) {
      setAccessToken(response.data.access_token);
    }
  } catch (e) {
    console.error("Invalid credentials", e);
    throw e;
  }
};
