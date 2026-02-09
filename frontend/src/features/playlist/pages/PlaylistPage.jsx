import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistSideBar from "../components/PlaylistSideBar";
import PlaylistManager from "../components/PlaylistManager";
import { removeFromStorage } from "../../player/redux/actions/playerActions";

const PlaylistPage = () => {
  const dispatch = useDispatch();
  window.onbeforeunload = function () {
    dispatch(removeFromStorage());
    return null;
  };
  return (
    <div className="w-screen h-screen bg-black">
      <div className={`w-screen h-[100vh] flex gap-2 p-0.5 pl-2`}>
        <PlaylistSideBar />
        <PlaylistManager />
      </div>
    </div>
  );
};

export default PlaylistPage;
