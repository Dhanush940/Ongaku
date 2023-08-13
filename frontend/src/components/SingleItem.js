import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToStorage, removeFromStorage } from "../redux/actions/songStorage";
import { MdDelete } from "react-icons/md";
import { deleteSongFromDatabase, loadSongs } from "../redux/actions/song";

const SingleItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [deleteSong, setDeleteSong] = useState(false);
  const { currentSong } = useSelector((state) => state.storage);
  return (
    <>
      <div className="p-2 m-2 relative" key={index}>
        {/* {console.log("Item :", item)} */}
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
                  // console.log("clicked");
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

          {deleteSong && (
            <div
              className="absolute top-20 left-5 bg-img"
              onClick={() => console.log("Hello")}
            >
              Are you sure you want to delete?
              <div className="flex gap-10 mt-3">
                <div
                  onClick={() => {
                    dispatch(deleteSongFromDatabase(item._id));
                    if (currentSong?.song === item.song) {
                      // console.log("ABout to remove");
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

                {/* becuase of active class on div we have to click on the text to make it scale down and not on the div .THat is the reason why i enclosed it in another div */}
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
        </div>
      </div>
    </>
  );
};

export default SingleItem;
