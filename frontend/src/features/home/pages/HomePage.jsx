import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromStorage } from "../../player/redux/actions/playerActions";
import SongPlayer from "../../player/components/SongPlayer";
import Loader from "../../../components/layout/Loader";
import SideBar from "../../../components/layout/SideBar";

import MainContent from "../components/MainContent";

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
            <MainContent />
          </div>

          {currentSong?.duration && <SongPlayer songs={songs} />}
        </div>
      )}
    </>
  );
};

export default HomePage;
