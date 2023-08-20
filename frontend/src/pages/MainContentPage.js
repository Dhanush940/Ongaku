import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Guest from "../components/Guest";
import UserSong from "../components/UserSong";
import axios from "axios";
import { backend_server } from "../server";
import { toast } from "react-toastify";

const MainContentPage = () => {
  const [showLogoutDiv, setShowLogoutDiv] = useState(false);
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const { songs } = useSelector((state) => state.songs);

  const navigate = useNavigate();
  const logoutHandler = () => {
    axios
      .get(`${backend_server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-[80%] ml-1 sm:w-[75%] sm:ml-0 my-2 mr-1  rounded-md bg-[#1f1f1f] overflow-y-auto relative ">
      <div className="bg-stone-400 p-4 flex justify-between items-center w-full sticky ">
        <div className="flex">
          <AiOutlineLeft size={20} color="white" />
          <AiOutlineRight size={20} color="white" />
        </div>
        {user === undefined ? (
          <div className="flex items-center gap-6">
            <Link to="/sign-up">
              <span className="font-semibold text-white hover:font-extrabold">
                Sign up
              </span>
            </Link>
            <Link to="login">
              <div className="bg-white p-4 w-32 rounded-e-3xl rounded-s-3xl text-center text-black font-bold hover:bg-slate-50">
                Log in
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 items-center relative mr-2">
            <span>Hi,{user.name}</span>

            <img
              src={user.avatar.url}
              alt="Image"
              className="w-10 h-10 rounded-full"
              onMouseOver={() => setShowLogoutDiv(!showLogoutDiv)}
            />

            {showLogoutDiv && (
              <div className="w-24 h-10 bg-zinc-700 rounded-lg absolute top-10 -right-6 flex justify-center items-center z-50 ">
                <div className="active:scale-95">
                  <span
                    className="z-40 hover:cursor-pointer hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-transparent
                    hover:text-xl hover:bg-clip-text"
                    onClick={() => {
                      logoutHandler();
                    }}
                  >
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {loading === false && isAuthenticated ? (
        <div>
          {songs?.length > 0 ? (
            <>
              <UserSong />
            </>
          ) : (
            songs?.length < 1 && (
              <div
                className="flex flex-col items-center  text-white font-bold text-2xl
            h-full gap-2"
              >
                <h1>You don't have any songs</h1>
              </div>
            )
          )}
        </div>
      ) : (
        <Guest />
      )}
    </div>
  );
};

export default React.memo(MainContentPage);
//For optimizing performance of the react app
