import api from "./api";

export const changePassword = async (email, currentPassword, newPassword) => {
  try {
    const response = await api.post("/change-password", {
      email: email,
      current_password: currentPassword,
      new_password: newPassword,
    });
    // 成功返回後端的數據
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // 後端返回的錯誤消息
      throw new Error(
        error.response.data.message || "Failed to change password"
      );
    } else {
      throw new Error("An error occurred while changing password");
    }
  }
};
