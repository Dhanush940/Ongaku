import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { BsSearchHeartFill } from "react-icons/bs";
import { MdLibraryMusic, MdQueueMusic } from "react-icons/md";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  HOME,
  PLAYLISTS,
  getPlaylistDetailsPath,
} from "../../../constants/routes";
import { getPlaylists } from "../../../features/playlist/playlistThunks";
import SongUploadModal from "../../../features/song/components/SongUploadModal";
import type { AppDispatch, RootState } from "../../../store/store";

const NavigationSidebar: React.FC = () => {
  const { t } = useTranslation("common");
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [rotate, setRotate] = useState(id ? true : false);
  const [create, setCreate] = useState(false);

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { loading, playlists } = useSelector(
    (state: RootState) => state.playlist,
  );

  // Fetch playlists if authenticated and not yet loaded
  useEffect(() => {
    if (isAuthenticated && playlists?.length === 0) {
      dispatch(getPlaylists());
    }
  }, [dispatch, isAuthenticated, playlists?.length]);

  const handleCreateClick = () => {
    if (isAuthenticated) {
      setCreate(!create);
    } else {
      toast.error(t("errors.login_to_add_songs"));
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[20%] sm:w-[25%] my-2 h-full">
      {/* Top Nav Links */}
      <div className="h-[20%] bg-[#1f1f1f] rounded-md p-1.5 sm:p-3 flex flex-col justify-between">
        <Link to={HOME.ROOT}>
          <div className="flex w-full gap-3 items-center group">
            <div className="mr-1 sm:mr-0 group-hover:text-white transition-colors">
              <AiOutlineHome
                size={22}
                className="text-zinc-400 group-hover:text-white"
              />
            </div>
            <p className="text-zinc-400 group-hover:text-white font-bold mt-1 sm:block hidden transition-colors">
              {t("navigation.home")}
            </p>
          </div>
        </Link>
        <Link to="/search">
          <div className="flex w-full gap-3 items-center group">
            <div className="mr-1 sm:mr-0 group-hover:text-white transition-colors">
              <BsSearchHeartFill
                size={22}
                className="text-zinc-400 group-hover:text-white"
              />
            </div>
            <p className="text-zinc-400 group-hover:text-white font-bold mt-1 hidden sm:block transition-colors">
              {t("navigation.search")}
            </p>
          </div>
        </Link>
      </div>

      {/* Library Section */}
      <div className="h-[80%] bg-[#1f1f1f] rounded-md flex flex-col overflow-hidden">
        <div className="p-1.5 sm:p-3 flex flex-col gap-4 h-full">
          {/* Library Header */}
          <div className="flex justify-between items-center px-1">
            <div className="hidden sm:block group cursor-pointer hover:text-white transition-colors">
              <div className="flex gap-3 w-full items-center">
                <MdQueueMusic
                  size={30}
                  className="text-zinc-400 group-hover:text-white sm:block hidden"
                />
                <p className="text-zinc-400 group-hover:text-white font-bold hidden md:block">
                  {t("navigation.library")}
                </p>
              </div>
            </div>
            <div className="mr-1 sm:mr-0 relative group">
              <AiOutlinePlus
                size={22}
                className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
                onClick={handleCreateClick}
                title={t("navigation.add_songs")}
              />
              {create && isAuthenticated && (
                <SongUploadModal setCreate={setCreate} />
              )}
            </div>
          </div>

          {/* Expanded Playlist List */}
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {/* Playlist Toggle */}
            <div className="flex justify-between items-center w-full mb-2">
              <Link
                to={PLAYLISTS.ROOT}
                className="flex-1 hidden sm:block group"
              >
                <div className="flex gap-3 items-center">
                  <MdLibraryMusic
                    size={22}
                    className="text-zinc-400 group-hover:text-white sm:block hidden"
                  />
                  <p className="text-zinc-400 group-hover:text-white font-bold hidden md:block transition-colors">
                    {t("navigation.playlists")}
                  </p>
                </div>
              </Link>
              <div
                className="mr-1 sm:mr-0 cursor-pointer p-1 rounded-full hover:bg-zinc-800 transition-colors"
                onClick={() => setRotate(!rotate)}
              >
                {rotate ? (
                  <RiArrowUpSFill
                    size={22}
                    className="text-zinc-400 hover:text-white"
                  />
                ) : (
                  <RiArrowDownSFill
                    size={22}
                    className="text-zinc-400 hover:text-white"
                  />
                )}
              </div>
            </div>

            {/* List of Playlists */}
            {rotate && (
              <div className="space-y-1 hidden sm:block">
                {loading ? (
                  <div className="text-zinc-500 text-sm px-4">
                    {t("loading")}
                  </div>
                ) : (
                  playlists?.map((item) => (
                    <Link to={getPlaylistDetailsPath(item._id)} key={item._id}>
                      <div
                        className={`w-full px-4 py-2 rounded-md truncate text-sm transition-colors ${
                          id === item._id
                            ? "bg-zinc-800 text-white font-medium"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        }`}
                      >
                        {item.name}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavigationSidebar);
