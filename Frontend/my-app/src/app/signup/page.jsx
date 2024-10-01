"use client";
import React from "react";
import ImageSection from "./ImageSection";
import SignupForm from "./SignupForm";

function SignupPage() {
  return (
    <main className="overflow-hidden">
      <div className="flex bg-[#B669B1] max-md:flex-col">
        <ImageSection />
        <SignupForm />
      </div>
    </main>
  );
}

export default SignupPage;
