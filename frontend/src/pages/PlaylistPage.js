import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistSideBar from "../components/PlaylistSideBar";
import PlaylistContent from "../components/PlaylistContent";
import { removeFromStorage } from "../redux/actions/songStorage";

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
        <PlaylistContent />
      </div>
    </div>
  );
};

export default PlaylistPage;
