import api from './api';

export const changePassword = async (email,currentPassword, newPassword) => {
  try {
    const response = await api.post(
      '/change-password',
      {
        email : email,
        current_password: currentPassword,
        new_password: newPassword,
      }
    );

    console.log(response.data.message); 
  } catch (error) {
    console.error(error.response?.data?.message || 'Error changing password');
  }
};
