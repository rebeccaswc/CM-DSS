"use client";
import React, { useState } from "react";
import InfoItem from "../../components/ui/InfoItem";
import {
  IdentificationIcon,
  ArrowRightStartOnRectangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import useStore from "../../useStore";
import { useRouter } from "next/navigation";
import { changePassword } from "../api/changePassword";

function InfoList() {
  const email = useStore((state) => state.email); // Get email from Zustand store
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const InfoData = [
    { title: "Account", content: email },
    { title: "Password", content: "********" },
    { title: "Billing", content: "Standard Plan" },
  ];

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalVisible(false);
      router.push("/login");
    }, 1000);
  };
  // logout function
  const handleLogout = () => {
    // remove localStorage's access_token
    localStorage.removeItem("access_token");
    setIsModalVisible(true);
  };
  // ChangePassword unction
  const handleChangePassword = async () => {
    try {
      await changePassword(email, currentPassword, newPassword);
      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => {
        setIsChangePasswordModalVisible(false);
        setMessage("");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error changing password");
    }
  };
  return (
    <main className="flex flex-col w-10/12 gap-4 max-w-screen-sm leading-snug whitespace-nowrap">
      <div className="flex items-center gap-2 mb-4">
        <IdentificationIcon className="w-10 h-10 text-white" />
        <h1 className="text-2xl font-bold text-white">Profile</h1>
      </div>
      {InfoData.map((item, index) => {
        if (item.title === "Password") {
          return (
            <div key={index} className="w-full flex flex-col">
              <InfoItem title={item.title} content={item.content} />
              <button
                onClick={() => setIsChangePasswordModalVisible(true)}
                className="flex flex-row mt-2 px-4 py-2 w-full border-solid ring-2 ring-blue-500/50 text-white rounded-lg justify-center"
              >
                <PencilSquareIcon className="w-5 h-5 mr-2" />
                Change Password
              </button>
            </div>
          );
        } else {
          return (
            <InfoItem key={index} title={item.title} content={item.content} />
          );
        }
      })}
      <button
        onClick={handleLogout}
        className="flex flex-row mt-2 px-4 py-2 w-full border-solid ring-2 ring-red-500/50 text-white rounded-lg justify-center"
      >
        <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-2" />
        Sign Out
      </button>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-semibold">Logged out successfully!</h3>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 rounded-md text-white font-semibold text-lg border-2 border-gray-100 bg-[#B366AE]"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isChangePasswordModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="px-4 py-2 border rounded-lg mb-2 w-full"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-2 border rounded-lg mb-4 w-full"
            />
            {message && <p className="text-red-500 mb-2">{message}</p>}
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-[#B366AE] text-white rounded-lg mb-2"
            >
              Submit
            </button>
            <button
              onClick={() => setIsChangePasswordModalVisible(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default InfoList;