"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  TrashIcon,
  PencilIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import AuthGuard from "../../components/ui/AuthGuard";

function FilePage() {
  const [files, setFiles] = useState([]);
  const [titles, setTitles] = useState({});

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages"));
    const storedTitles = JSON.parse(localStorage.getItem("imageTitles"));
    if (storedImages) {
      setFiles(storedImages);
    }
    if (storedTitles) {
      setTitles(storedTitles);
    }
  }, []);

  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const imageUrls = uploadedFiles.map((file) => URL.createObjectURL(file));
    const newFiles = [...files, ...imageUrls];
    setFiles(newFiles);
    localStorage.setItem("uploadedImages", JSON.stringify(newFiles));
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDeleteImage = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmDelete) {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);

      const newTitles = { ...titles };
      delete newTitles[files[index]]; // 刪除對應的標題
      setTitles(newTitles);

      localStorage.setItem("uploadedImages", JSON.stringify(newFiles));
      localStorage.setItem("imageTitles", JSON.stringify(newTitles));
    }
  };

  const handleEditTitle = (file) => {
    const newTitle = prompt(
      "Enter a new title for this image:",
      titles[file] || ""
    );
    if (newTitle !== null) {
      const updatedTitles = { ...titles, [file]: newTitle };
      setTitles(updatedTitles);
      localStorage.setItem("imageTitles", JSON.stringify(updatedTitles));
    }
  };

  return (
    <AuthGuard>
      <main className="h-screen flex">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="w-10/12 bg-[#1d203e] flex justify-start">
          <div className="flex flex-col items-center justify-start w-full mt-20">
            <button
              onClick={handleUploadClick}
              className="flex items-center bg-violet-700 text-white px-4 py-2 rounded-lg mb-4 space-x-2"
            >
              <CloudArrowUpIcon className="h-6 w-6 text-white" />
              Upload
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow w-64 h-64 relative overflow-hidden flex flex-col"
                  >
                    <div className="relative flex-grow">
                      <Image
                        src={file}
                        alt={`Uploaded Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-lg"
                      />
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-700 truncate">
                        {titles[file] || "No Title"}
                      </span>
                      <button
                        onClick={() => handleEditTitle(file)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-500 p-4 rounded-lg shadow flex items-center justify-center w-64 h-64">
                  <LockClosedIcon className="h-24 w-24 text-white p-8" />
                </div>
              )}
            </div>
            <div className="bg-slate-400 text-white rounded-lg p-2 flex items-center justify-center fixed bottom-4 shadow-lg">
              <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
              <p className="text-sm">
                Only Cisco Packet Tracer network diagrams can be uploaded.
              </p>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}

export default FilePage;
