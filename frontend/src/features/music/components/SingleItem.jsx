import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToStorage, removeFromStorage } from "../../music/redux/songStorage.actions";
import { MdDelete } from "react-icons/md";
import { deleteSongFromDatabase, loadSongs } from "../../music/redux/song.actions";
import { useParams } from "react-router-dom";
import { removeSongFromPlaylist } from "../../playlist/redux/playlist.actions";

const SingleItem = ({ item, index, playlists }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [deleteSong, setDeleteSong] = useState(false);
  const { currentSong } = useSelector((state) => state.storage);
  const { id } = useParams();

  return (
    <>
      <div className="p-2 m-2 mt-4 relative" key={index}>
        <div
          className={`flex flex-col bg-[#151515] p-3 w-40 h-64 text-white rounded-lg hover:bg-[rgba(97,79,79,0.64)] relative group `}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className={`flex flex-col ${deleteSong && "hidden"}`}>
            <img
              src={item.image}
              alt=""
              className="rounded-lg relative h-[150px]"
            />

            <span className="font-bold m-1  ">{item.title}</span>
            <span className="font-light m-1 text-zinc-400">
              By{" "}
              {item.name?.length > 40
                ? item.name.substring(0, 40) + "..."
                : item.name}
            </span>
          </div>

          {hover && (deleteSong ? false : true) && (
            <>
              <div
                className="bg-green-600 w-12 h-12 absolute top-24 right-5 rounded-full flex items-center justify-center pl-1  hover:scale-110 "
                onClick={() => {
                  // localStorage.setItem("currentSong", JSON.stringify(item));
                  if (currentSong?.song !== item.song)
                    dispatch(
                      addToStorage({
                        duration: item.duration,
                        song: item.song,
                        image: item.image,
                        title: item.title,
                        name: item.name,
                      })
                    );
                }}
              >
                <FaPlay size={25} color="black" />
              </div>

              <div
                className="absolute top-3 right-3 text-red-400 "
                onClick={() => setDeleteSong(true)}
              >
                <MdDelete
                  size={25}
                  className="active:text-red-800 active:scale-50"
                  title="Delete Song"
                />
              </div>
            </>
          )}

          {/* Homepage song deletion .Playlists by default will be undefined as i am not sending any prop from home page*/}

          {!playlists && deleteSong && (
            <div className="absolute top-20 left-5 ">
              Are you sure you want to delete
              <div className="flex gap-10 mt-3">
                <div
                  onClick={() => {
                    dispatch(deleteSongFromDatabase(item._id));
                    if (currentSong?.song === item.song) {
                      dispatch(removeFromStorage());
                    }
                    dispatch(loadSongs());
                  }}
                >
                  <div
                    className=" bg-slate-500 w-10 h-10 rounded-full
                 active:scale-50 text-center
                 hover:cursor-pointer"
                  >
                    <span className="relative top-1.5">Yes</span>
                  </div>
                </div>

                <div onClick={() => setDeleteSong(false)}>
                  <div
                    className=" bg-slate-500 w-10 h-10  rounded-full
                 text-center
                 active:scale-50
                 hover:cursor-pointer"
                  >
                    <span className="relative top-1.5">No</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Playlist song removal */}
          {playlists && deleteSong && (
            <div className="absolute top-20 left-5 ">
              Are you sure you want to remove?
              <div className="flex gap-10 mt-3">
                <div
                  onClick={() => {
                    dispatch(removeSongFromPlaylist(id, item));
                    if (currentSong?.song === item.song) {
                      dispatch(removeFromStorage());
                    }
                    dispatch(loadSongs());
                  }}
                >
                  <div
                    className=" bg-slate-500 w-10 h-10 rounded-full
                 active:scale-50 text-center
                 hover:cursor-pointer"
                  >
                    <span className="relative top-1.5">Yes</span>
                  </div>
                </div>

                <div onClick={() => setDeleteSong(false)}>
                  <div
                    className=" bg-slate-500 w-10 h-10  rounded-full
                 text-center
                 active:scale-50
                 hover:cursor-pointer"
                  >
                    <span className="relative top-1.5">No</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <span className="absolute bottom-2 right-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent text-3xl bg-clip-text">
            {index + 1}
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleItem;
