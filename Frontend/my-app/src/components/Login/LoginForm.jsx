import React, { useState } from 'react';
import InputField from './InputField';

function LoginForm() {
  const [username, setUsername] = useState('CSC666@ntust.pokémon.master.edu.tw');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="flex flex-col ml-0 w-[69%] md:max-h-screen">
      <div className="flex overflow-hidden flex-col grow justify-center items-center px-20 py-28 w-full text-base font-bold bg-white rounded-[40px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <form onSubmit={handleSubmit} className="flex flex-col ml-3.5 max-w-full w-[525px]">
          <h2 className="self-start text-5xl text-black max-md:text-4xl">
            Welcome <br/> Back!
          </h2>
          <InputField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="flex gap-3.5 self-start mt-4 ml-3.5 text-xs text-neutral-400 text-opacity-80 max-md:ml-2.5">
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
          <button
            type="submit"
            className="px-14 py-4 mt-12 text-3xl text-center text-white rounded-2xl border border-solid border-neutral-400 max-md:px-5 max-md:max-w-full bg-[#B366AE]"
          >
            SIGN IN
          </button>
          <a
            href="#"
            className="self-center mt-8 text-xs text-center text-neutral-400 text-opacity-80"
          >
            Forgot Password?
          </a>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;