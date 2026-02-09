import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_server } from "../../config";
import { AUTH, HOME } from "../../constants/routes";

const Header = () => {
  const [showLogoutDiv, setShowLogoutDiv] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${backend_server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate(HOME.ROOT);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
      });
  };

  return (
    <div className="bg-stone-400 p-4 flex justify-end items-center w-full sticky top-0 z-10 rounded-t-md">
      {user === undefined ? (
        <div className="flex items-center gap-6">
          <Link to={AUTH.SIGNUP}>
            <span className="font-semibold text-white hover:font-extrabold">
              Sign up
            </span>
          </Link>
          <Link to={AUTH.LOGIN}>
            <div className="bg-white p-4 w-32 rounded-e-3xl rounded-s-3xl text-center text-black font-bold hover:bg-slate-50">
              Log in
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 items-center mr-3 relative">
          <span className="text-white font-medium">Hi, {user.name}</span>
          <img
            src={user.avatar?.url}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer object-cover"
            onMouseOver={() => setShowLogoutDiv(true)}
            onMouseOut={() => setShowLogoutDiv(false)}
          />

          {showLogoutDiv && (
            <div
              className="w-24 h-fit py-2 bg-zinc-700 rounded-lg absolute top-10 -right-2 flex justify-center items-center z-50 shadow-lg"
              onMouseOver={() => setShowLogoutDiv(true)}
              onMouseOut={() => setShowLogoutDiv(false)}
            >
              <div
                className="cursor-pointer hover:text-pink-500 text-white font-medium transition-colors"
                onClick={logoutHandler}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
