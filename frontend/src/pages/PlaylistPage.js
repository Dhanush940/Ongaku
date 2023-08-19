import React from "react";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import PlaylistSideBar from "./PlaylistSideBar";
import PlaylistContentPage from "./PlaylistContentPage";
import { removeFromStorage } from "../redux/actions/songStorage";

const PlaylistPage = () => {
  // const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state) => state.storage);

  // useEffect(() => {
  //   // console.log("currentSong refreshing");
  //   // setPlay(true)
  // }, [currentSong]);

  window.onbeforeunload = function () {
    // console.log("Refresh");

    dispatch(removeFromStorage());

    return null;
  };
  return (
    <div className="w-screen h-screen bg-black">
      <div className={`w-screen h-[100vh] flex gap-2 p-0.5 pl-2`}>
        <PlaylistSideBar />
        <PlaylistContentPage />
      </div>
    </div>
  );
};

export default PlaylistPage;
