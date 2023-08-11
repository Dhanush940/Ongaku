import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToStorage } from "../redux/actions/songStorage";

const SingleItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const { currentSong } = useSelector((state) => state.storage);
  return (
    <>
      <div className="p-2 m-2" key={index}>
        {/* {console.log("Item :" + item)} */}
        <div
          className="flex flex-col bg-[#151515] p-3 w-40 h-64 text-white rounded-lg hover:bg-[rgba(97,79,79,0.64)] relative group "
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img
            src={item.image}
            alt=""
            className="rounded-lg relative h-[150px]"
          />
          {hover && (
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
          )}
          <span className="font-bold m-1  ">{item.title}</span>
          <span className="font-light m-1 text-zinc-400">
            By{" "}
            {item.name?.length > 40
              ? item.name.substring(0, 40) + "..."
              : item.name}
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleItem;
