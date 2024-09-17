import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logInWithPythonService } from "./login.js";
import InputField from "./InputField.jsx";
import useStore from "../../useStore.js";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const router = useRouter();
  const setCurrentEmail = useStore((state) => state.setCurrentEmail);// use Zustand's setEmail


  const signUp = async (e) => {
    e.preventDefault();
    router.push("/signup")
  };

  const signIn = async (e) => {
    e.preventDefault();
    try{
      await logInWithPythonService(email, password)
      setCurrentEmail(email)
      setLoginFailed(false)
      router.push("/home");
    }catch (e) {
      console.error('Sign in error:', e);
      setLoginFailed(true)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCloseModal = () => {
    setLoginFailed(false)
  };

  return (
    <section className="flex flex-col ml-0 w-[69%] md:max-h-screen">
      <div className="flex overflow-hidden flex-col grow justify-center items-center px-20 py-28 w-full text-base font-bold bg-white rounded-[40px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col ml-3.5 max-w-full w-[525px]"
        >
          <h2 className="self-start text-5xl text-black max-md:text-4xl">
          Welcome <br/> Back!
                    </h2>
          <InputField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
          />
          <div className="flex flex-col">
            <InputField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-3.5 text-xs text-neutral-400 text-opacity-80">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="shrink-0 bg-white border border-solid border-neutral-400 h-[19px] w-[19px]"
              />
              <label htmlFor="remember" className="my-auto basis-auto">
                Remember me for 30 days
              </label>
            </div>
            <a
              href="#"
              className="text-[#B366AE] text-xs"
            >
              Forgot Password?
            </a>
          </div>

          <button
            onClick={(e) => signIn(e)}
            className="flex items-center justify-center gap-2 px-5 py-4 mt-6 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform rounded-xl text-white font-semibold text-lg border-2 border-gray-100 bg-[#B366AE]"
          >
            Sign in
          </button>

          <p className="flex items-center justify-center gap-2 px-5 mt-6 text-gray-400 text-base">
          Not register yet?
                      <button onClick={(e) => signUp(e)} className="text-sky-500 ">
                      Create Account Now!
            </button>
          </p>
        </form>

        {/* Conditionally render the success message */}
        { loginFailed  && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold">
                 Log in Failed!
              </h3>
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

export default LoginForm;
