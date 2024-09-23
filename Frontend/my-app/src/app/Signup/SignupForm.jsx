import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUpWithPythonService } from "./signup.js";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import InputField from "./InputField.jsx";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupFailed, setSignupFailed] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const router = useRouter();

  const validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const signUp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setSignupFailed(true);
      setSignupSuccess(false);
      setSignupErrorMessage("Please enter a valid email address.");
      return;
    }
    try {
      const result = await signUpWithPythonService(email, password);
      handleSignUpSuccess(result);
    } catch (error) {
      handleSignUpError(error);
    }
  };
  

  const signIn = async (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const handleSignUpSuccess = () => {
    setSignupSuccess(true);
    setSignupFailed(false);
    setSignupErrorMessage("");
  };

  const handleSignUpError = (error) => {
    setSignupFailed(true);
    setSignupSuccess(false);
    if (error.response && error.response.status === 409) {
      setSignupErrorMessage("Email already registered.");
    } else {
      setSignupErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCloseModal = () => {
    setSignupFailed(false);
    setSignupSuccess(false);
    setSignupErrorMessage("");
  };

  return (
    <section className="flex flex-col ml-0 w-[69%] md:max-h-screen">
      <div className="flex overflow-hidden flex-col grow justify-center items-center px-20 py-28 w-full text-base font-bold bg-white rounded-[40px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col ml-3.5 max-w-full w-[525px]"
        >
          <h2 className="self-start text-5xl text-black max-md:text-4xl">
            Create an account <br />
          </h2>
          <p className="flex gap-2 px-2 mt-3 text-gray-400">
            Please Fill out form to Register!
          </p>
          <InputField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
          />
              <div className="relative flex flex-col">
            <InputField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-6 top-3/4 transform -translate-y-1/4 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            onClick={(e) => signUp(e)}
            className="flex items-center justify-center gap-2 px-5 py-4 mt-6 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform rounded-xl text-white font-semibold text-lg border-2 border-gray-100 bg-[#B366AE]"
          >
            Sign up
          </button>

          <p className="flex items-center justify-center gap-2 px-5 mt-6 text-gray-400 text-base">
            Already have an account?
            <button onClick={(e) => signIn(e)} className="text-sky-500 ">
              Login in Now!
            </button>
          </p>
        </form>

        {/* Conditionally render the success message */}

        {(signupSuccess || signupFailed) && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold">
                {signupFailed ? "Sign up Failed!" : "Sign up Successful!"}
              </h3>
              {signupFailed && signupErrorMessage && (
                <p className="text-gray-400">{signupErrorMessage}</p>
              )}
              <button
                onClick={handleCloseModal}
                className="mt-4 px-4 py-2 rounded-md text-white font-semibold text-lg border-2 border-gray-100 bg-[#B366AE]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SignupForm;
