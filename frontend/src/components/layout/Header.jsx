import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios"; // Removed
// import { backend_server } from "../../config"; // Removed
import { AUTH, HOME } from "../../constants/routes";
import { logoutUser } from "../../features/auth/userThunks"; // Import logoutUser thunk

const Header = () => {
  const [showLogoutDiv, setShowLogoutDiv] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload || "Logged out successfully");
        navigate(HOME.ROOT);
        // window.location.reload(true); // No reload needed with Redux
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-stone-400 p-4 flex justify-end items-center w-full sticky top-0 z-10 rounded-t-md">
      {/* 
        Fix: Check for !user (null or undefined) instead of just undefined.
        Initial state is null, so user === undefined is false.
      */}
      {!user ? (
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
          {/* Safe access user properties just in case, though nested checks usually safer */}
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
