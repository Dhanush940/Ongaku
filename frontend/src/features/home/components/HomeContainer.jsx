import React from "react";
import { useSelector } from "react-redux";
import Guest from "./Guest";
import UserSongList from "../../song/components/UserSongList";
import Header from "../../../components/layout/Header";

const HomeContainer = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const { songs } = useSelector((state) => state.songs);

  return (
    <div className="w-[80%] ml-1 sm:w-[75%] sm:ml-0 my-2 mr-1 rounded-md bg-[#1f1f1f] overflow-y-auto relative">
      <Header />

      {loading === false && isAuthenticated ? (
        <div>
          {songs?.length > 0 ? (
            <UserSongList />
          ) : (
            <div className="flex flex-col items-center text-white font-bold text-2xl h-full gap-2 mt-10">
              <h1>You don't have any songs</h1>
            </div>
          )}
        </div>
      ) : (
        <Guest />
      )}
    </div>
  );
};

export default React.memo(HomeContainer);
