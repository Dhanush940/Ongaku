import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import { SiMusicbrainz } from "react-icons/si";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ForgotPasswordPage = () => {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");

  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    authService.forgotPassword({ fullName, email })
      .then(({ message }) => {
        setEmail("");
        setFullName("");
        toast.success(message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="w-screen h-screen  bg-gray-600">
        <div className="h-[10vh] bg-black pl-12 flex">
          <Link to="/">
            <div className="flex items-center mt-2.5">
              <SiMusicbrainz size={40} color="white" />
              <span className="font-extrabold text-white text-2xl">
                {t("app_name", { ns: "common" })}
              </span>
            </div>
          </Link>
        </div>

        <div className="py-12">
          <h1 className="mt-4 text-center text-white font-bold text-3xl ">
            {t("reset_password_title")}
          </h1>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-white"
                  >
                    {t("full_name")}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
                  focus:border-4
                  bg-slate-800 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    {t("email_address")}
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
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {t("submit")}
                  </button>
                </div>
                <div className="flex items-center w-full">
                  <h4 className="text-white">{t("no_account")}</h4>
                  <Link to="/signup" className="text-blue-600 pl-2">
                    {t("signup")}
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

export default ForgotPasswordPage;
