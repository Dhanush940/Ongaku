import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Guest from "./Guest";
import UserSongList from "../../song/components/UserSongList";
import Header from "../../../shared/components/layout/Header";
import { loadSongs } from "../../song/songThunks";
import type { AppDispatch, RootState } from "../../../store/store";

const HomeContainer: React.FC = () => {
  const { t } = useTranslation('home');
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.user);
  const { songs } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch<AppDispatch>();

  // Load songs if user is authenticated and songs list is empty
  // This handles the case where user logs in and songs weren't loaded by bootstrapApp
  useEffect(() => {
    if (isAuthenticated && (!songs || songs.length === 0)) {
       dispatch(loadSongs());
    }
  }, [dispatch, isAuthenticated, songs?.length]);

  return (
    <div className="w-[80%] ml-1 sm:w-[75%] sm:ml-0 my-2 mr-1 rounded-md bg-[#1f1f1f] overflow-y-auto relative">
      <Header />

      {loading === false && isAuthenticated ? (
        <div>
          {songs?.length > 0 ? (
            <UserSongList songs={songs} />
          ) : (
            <div className="flex flex-col items-center text-white font-bold text-2xl h-full gap-2 mt-10">
              <h1>{t('no_songs')}</h1>
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
