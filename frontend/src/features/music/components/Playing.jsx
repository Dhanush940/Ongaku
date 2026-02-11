import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Playing = ({ play, audioRef, time, setTime }) => {
  const { currentSong } = useSelector((state) => state.storage);
  return (
    <div>
      <div className="flex gap-1 items-center justify-center">
        <span>
          {Math.floor(time / 60) < 1 ? 0 : Math.floor(time / 60)}:
          {Math.floor(time % 60) < 10
            ? `0${Math.floor(time % 60)}`
            : Math.floor(time % 60)}
        </span>
        <input
          type="range"
          value={Math.floor(time)}
          name=""
          id=""
          min={0}
          max={currentSong.duration}
          onChange={(e) => {
            setTime(e.target.value);
            audioRef.current.currentTime = Number(e.target.value);
          }}
          className="  w-20 sm:w-60"
        />
        <span>
          {Math.floor(currentSong.duration / 60)}:
          {currentSong.duration % 60 < 10
            ? `0${currentSong.duration % 60}`
            : currentSong.duration % 60}
        </span>
      </div>
    </div>
  );
};

export default Playing;
