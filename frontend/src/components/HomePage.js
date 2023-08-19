import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromStorage } from "../redux/actions/songStorage";
import SongPlayer from "./SongPlayer";
import Loader from "./Layout/Loader";
import SideBar from "./SideBar";

import MainContentPage from "../pages/MainContentPage";

const HomePage = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state) => state.storage);
  const { songs } = useSelector((state) => state.songs);
  // const [mount, setMount] = useState(true);
  // console.log(
  //   "CurrentSong duration",
  //   currentSong?.duration,
  //   typeof currentSong?.duration
  // );

  useEffect(() => {
    // console.log("currentSong refreshing");
    // setPlay(true)
  }, [currentSong]);

  useEffect(() => {
    return () => {
      dispatch(removeFromStorage());
      // console.log("unmounting");
    };
  }, []);

  // useEffect(() => {
  //   console.log("Because of currentSong songs is also refreshed");
  // }, [songs]);

  // window.onbeforeunload = function () {
  //   sessionStorage.setItem("origin", window.location.href);
  // };

  window.onbeforeunload = function () {
    console.log("Refresh");
    // if (window.location.href == sessionStorage.getItem("origin")) {
    // }

    dispatch(removeFromStorage());

    // console.log("currentSong doesn't exist");
    return null;
  };

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

          {currentSong?.duration && <SongPlayer songs={songs} />}
        </div>
      )}
    </>
  );
};

export default HomePage;
