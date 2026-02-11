import React, { useEffect, useRef, useState } from "react";
import SingleItem from "./SingleItem";
import { useSelector } from "react-redux";

const UserSong = () => {
  const { songs } = useSelector((state) => state.songs);
  return (
    <>
      <div
        className={`flex flex-wrap gap-1 justify-center sm:justify-between lg:justify-normal mt-3 `}
      >
        {songs.map((item, index) => {
          return <SingleItem item={item} key={item._id} index={index} />;
        })}
      </div>
    </>
  );
};

export default UserSong;
