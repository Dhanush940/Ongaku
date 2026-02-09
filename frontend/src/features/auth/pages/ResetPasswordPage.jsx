import React, { useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { backend_server } from "../../../config";
import { SiMusicbrainz } from "react-icons/si";
import { toast } from "react-toastify";
const ResetPasswordPage = () => {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const { token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return toast.error(`Password and confirm password doesn't match`);
    }
    axios
      .post(
        `${backend_server}/user/resetPassword`,
        { password, token, generatedPassword },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else toast.success(res.data.message);
        setPassword("");
        setConfirmPassword("");
        setGeneratedPassword("");
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          if (message === "Time expired") {
            toast.error("Time expired.Start the process again");
          }
        }
      );
  };

  return (
    <>
      <div className="w-screen h-screen  bg-gray-600">
        <div className="h-[10vh] bg-black pl-12 flex">
          <Link to="/">
            <div className="flex items-center mt-2.5">
              <SiMusicbrainz size={40} color="white" />
              <span className="font-extrabold text-white text-2xl">Ongaku</span>
            </div>
          </Link>
        </div>

        <div className="py-12">
          <h1 className="mt-4 text-center text-white font-bold text-3xl ">
            Reset Your Password
          </h1>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-black py-5 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="generatedPassword"
                    className="block text-sm font-medium text-white"
                  >
                    Enter password sent to your mail
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      value={generatedPassword}
                      name="generatedPassword"
                      required
                      onChange={(e) => {
                        setGeneratedPassword(e.target.value);
                      }}
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
                      type={visiblePassword ? "text" : "password"}
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
                  focus:border-4
                  bg-slate-800 text-white"
                    />
                    {visiblePassword ? (
                      <AiOutlineEye
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        color="white"
                        onClick={() => setVisiblePassword(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        color="white"
                        onClick={() => setVisiblePassword(true)}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                  >
                    Confirm new password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={visibleConfirmPassword ? "text" : "password"}
                      name="confirmpassword"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
                  focus:border-4
                  bg-slate-800 text-white"
                    />
                    {visibleConfirmPassword ? (
                      <AiOutlineEye
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        color="white"
                        onClick={() => setVisibleConfirmPassword(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        color="white"
                        onClick={() => setVisibleConfirmPassword(true)}
                      />
                    )}
                  </div>
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
                  <h4 className="text-white">Don't have an account?</h4>
                  <Link to="/sign-up" className="text-blue-600 pl-2">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
