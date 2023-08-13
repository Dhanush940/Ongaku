import React, { useEffect, useRef, useState } from "react";
import SingleItem from "./SingleItem";
import { useSelector } from "react-redux";

const UserSong = () => {
  const { songs } = useSelector((state) => state.songs);

  // useEffect(() => {
  // console.log("Refreshing usersong due to change in currentSong in homepage");
  // });
  // console.log("Refreshing usersong due to change in currentSong in homepage");

  return (
    <>
      <div
        className={`flex flex-wrap gap-1 justify-center sm:justify-between lg:justify-normal`}
      >
        {songs.map((item, index) => {
          // console.log("index is :" + index);
          return <SingleItem item={item} key={item._id} index={index} />;
        })}
      </div>
    </>
  );
};

export default UserSong;
