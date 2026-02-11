import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromStorage } from "../../player/playerSlice";
import SongPlayer from "../../player/components/SongPlayer";
import Loader from "../../../shared/components/layout/Loader";
import NavigationSidebar from "../../../shared/components/layout/NavigationSidebar";
import type { AppDispatch, RootState } from "../../../store/store";

import HomeContainer from "../components/HomeContainer";

const HomePage: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { currentSong } = useSelector((state: RootState) => state.storage);
  const { songs } = useSelector((state: RootState) => state.songs);

  useEffect(() => {}, [currentSong]);

  useEffect(() => {
    return () => {
      dispatch(removeFromStorage());
    };
  }, [dispatch]);

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
            <NavigationSidebar />
            <HomeContainer />
          </div>

          {currentSong?.duration && <SongPlayer songs={songs} />}
        </div>
      )}
    </>
  );
};

export default HomePage;
