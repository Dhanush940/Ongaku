import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistSideBar from "../components/PlaylistSideBar";
import { removeFromStorage } from "../../music/redux/songStorage.actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import SingleItem from "../../music/components/SingleItem";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SongPlayer from "../../music/components/SongPlayer";
import Loader from "../../../components/Loader";
import axios from "axios";
import { backend_server } from "../../../config";
import { toast } from "react-toastify";
const SpecificPlaylist = () => {
  const { id } = useParams();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const { playlists } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state) => state.storage);
  const [showLogoutDiv, setShowLogoutDiv] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      dispatch(removeFromStorage());
    };
  }, []);

  window.onbeforeunload = function () {
    dispatch(removeFromStorage());
    return null;
  };

  const logoutHandler = () => {
    axios
      .get(`${backend_server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-screen h-screen bg-black">
      <div
        className={
          currentSong?.duration === undefined
            ? `w-screen h-[100vh] flex gap-2 p-0.5 pl-2`
            : `w-screen h-[90vh] flex gap-2 p-0.5 pl-2`
        }
      >
        <PlaylistSideBar />
        <div className="w-[80%] ml-1 sm:w-[75%] sm:ml-0 my-2 mr-1  rounded-md bg-[#1f1f1f] overflow-y-auto relative ">
          <div className="bg-stone-400 p-4 flex justify-between items-center w-full sticky ">
            <div className="flex">
              <AiOutlineLeft size={20} color="white" />
              <AiOutlineRight size={20} color="white" />
            </div>
            {user === undefined ? (
              <div className="flex items-center gap-6">
                <Link to="/sign-up">
                  <span className="font-semibold text-white hover:font-extrabold">
                    Sign up
                  </span>
                </Link>
                <Link to="/login">
                  <div className="bg-white p-4 w-32 rounded-e-3xl rounded-s-3xl text-center text-black font-bold hover:bg-slate-50">
                    Log in
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex gap-2 items-center mr-3 relative">
                <span>Hi,{user.name}</span>
                <img
                  src={user.avatar.url}
                  alt="Image"
                  className="w-10 h-10 rounded-full"
                  onMouseOver={() => setShowLogoutDiv(!showLogoutDiv)}
                />

                {showLogoutDiv && (
                  <div className="w-24 h-10 bg-zinc-700 rounded-lg absolute top-10 -right-6 flex justify-center items-center z-50 ">
                    <div className="active:scale-95">
                      <span
                        className="z-40 hover:cursor-pointer hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-transparent
                    hover:text-xl hover:bg-clip-text"
                        onClick={() => {
                          logoutHandler();
                        }}
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {loading === true && <Loader />}
          {loading === false && isAuthenticated && (
            <div
              className={`flex flex-wrap gap-1 justify-center sm:justify-between lg:justify-normal`}
            >
              {playlists?.find((item) => item._id === id).playlistSongs.length <
              1 ? (
                <div className="w-full text-white text-center text-2xl mt-2">
                  You don't have any songs in your playlist
                </div>
              ) : (
                playlists
                  ?.find((item) => item._id === id)
                  .playlistSongs.map((item, index) => {
                    return (
                      <SingleItem
                        item={item}
                        key={item._id}
                        index={index}
                        playlists={true}
                      />
                    );
                  })
              )}
            </div>
          )}
        </div>
      </div>

      {currentSong?.duration && (
        <SongPlayer
          songs={playlists?.find((item) => item._id === id).playlistSongs}
        />
      )}
    </div>
  );
};

export default SpecificPlaylist;
