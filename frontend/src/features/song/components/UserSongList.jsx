import React, { useEffect, useRef, useState } from "react";
import SongCard from "./SongCard";
import { useSelector } from "react-redux";

const UserSongList = () => {
  const { songs } = useSelector((state) => state.songs);
  return (
    <>
      <div
        className={`flex flex-wrap gap-1 justify-center sm:justify-between lg:justify-normal mt-3 `}
      >
        {songs.map((item, index) => {
          return <SongCard item={item} key={item._id} index={index} />;
        })}
      </div>
    </>
  );
};

export default UserSongList;
