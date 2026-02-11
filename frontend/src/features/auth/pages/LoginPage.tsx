import React, { useState } from "react";
import { SiMusicbrainz } from "react-icons/si";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../userThunks";
import type { AppDispatch } from "../../../store/store";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  // Best Practice: Component logic handles UI feedback (Toasts/Navigation) after dispatch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Dispatch the thunk and wait for result
      const resultAction = await dispatch(loginUser({ email, password }));
      
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login Success!");
        // Navigation is handled by GuestLayout (redirects if authenticated), 
        // but explicit navigation ensures immediate feedback if needed.
        navigate("/"); 
      } else {
        // Handle rejection
        const errorMsg = resultAction.payload || "Login failed";
        toast.error(errorMsg);
      }
    } catch (err) {
      toast.error("Unexpected error during login");
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen  bg-gray-600">
      <div className="h-[10vh] bg-black pl-12 flex">
        <Link to="/">
          {" "}
          <div className="flex items-center mt-1.5">
            <SiMusicbrainz size={40} color="white" />
            <span className="font-extrabold text-white text-2xl">Ongaku</span>
          </div>
        </Link>
      </div>

      <div className="py-12">
        <h1 className="mt-4 text-center text-white font-bold text-3xl ">
          Login to Ongaku
        </h1>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
                  focus:border-4
                  bg-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
                  focus:border-4
                  bg-slate-800 text-white"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      color="white"
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      color="white"
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember" className="text-white">
                 {""} Remember me
                  </label>
                </div>
                <Link to="/forgotPassword">
                  <span className="text-blue-600">Forgot your password?</span>
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
              <div className="flex items-center w-full">
                <h4 className="text-white">Don&apos;t have an account?</h4>
                <Link to="/sign-up" className="text-blue-600 pl-2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
