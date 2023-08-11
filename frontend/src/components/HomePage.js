import React, { useEffect } from "react";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import UserSong from "./UserSong";

import { removeFromStorage } from "../redux/actions/songStorage";

import SongPlayer from "./SongPlayer";
import Loader from "./Layout/Loader";
import SideBar from "./SideBar";
import Guest from "./Guest";
import MainContentPage from "../pages/MainContentPage";

const HomePage = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const { songs } = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state) => state.storage);
  console.log(
    "CurrentSong duration",
    currentSong?.duration,
    typeof currentSong?.duration
  );

  useEffect(() => {
    // console.log("currentSong refreshing");
    // setPlay(true)
  }, [currentSong]);

  // useEffect(() => {
  //   console.log("Because of currentSong songs is also refreshed");
  // }, [songs]);

  // window.onbeforeunload = function () {
  //   sessionStorage.setItem("origin", window.location.href);
  // };

  window.onbeforeunload = function () {
    // console.log("Refresh");
    // if (window.location.href == sessionStorage.getItem("origin")) {
    dispatch(removeFromStorage());
    // }
  };

  // h-[${
  //             currentSong?.duration !== undefined ? 90 : 100
  //           }vh]

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-screen h-screen bg-black">
          <div
            className={
              currentSong?.duration === undefined
                ? `w-screen h-[100vh] flex gap-2 p-0.5 pl-2`
                : `w-screen h-[90vh] flex gap-2 p-0.5 pl-2`
            }
          >
            <SideBar />
            <MainContentPage />
          </div>

          {currentSong?.duration && <SongPlayer />}
        </div>
      )}
    </>
  );
};

export default HomePage;
