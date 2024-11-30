"use client";
import React from "react";
import ImageSection from "./ImageSection";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <main className="overflow-hidden">
      <div className="flex bg-[#B669B1] max-md:flex-col">
        <ImageSection />
        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;
