import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Guest from "../components/Guest";
import UserSong from "../components/UserSong";

const MainContentPage = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const { songs } = useSelector((state) => state.songs);
  console.log("MainContentPage");

  return (
    <div className="w-[75%] my-2 mr-1  rounded-md bg-[#1f1f1f] overflow-y-auto relative ">
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
          <div className="flex gap-2 items-center">
            <span>Hi,{user.name}</span>
            <Link to="/profile">
              <img
                src={user.avatar.url}
                alt="Image"
                className="w-10 h-10 rounded-full"
              />
            </Link>
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
