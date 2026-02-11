import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

interface SongProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  time: number;
  setTime: (time: number) => void;
}

const SongProgressBar: React.FC<SongProgressBarProps> = ({ audioRef, time, setTime }) => {
  const { currentSong } = useSelector((state: RootState) => state.storage);

  if (!currentSong) return null;

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
            const newTime = Number(e.target.value);
            setTime(newTime);
            if (audioRef.current) {
                audioRef.current.currentTime = newTime;
            }
          }}
          className="  w-20 sm:w-60"
        />
        <span>
          {Math.floor((currentSong.duration || 0) / 60)}:
          {(currentSong.duration || 0) % 60 < 10
            ? `0${(currentSong.duration || 0) % 60}`
            : (currentSong.duration || 0) % 60}
        </span>
      </div>
    </div>
  );
};

export default SongProgressBar;
