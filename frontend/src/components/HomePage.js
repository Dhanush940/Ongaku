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

  useEffect(() => {}, [currentSong]);

  useEffect(() => {
    return () => {
      dispatch(removeFromStorage());
    };
  }, []);

  window.onbeforeunload = function () {
    dispatch(removeFromStorage());
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
