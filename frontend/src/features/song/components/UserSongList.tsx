import React from "react";
import SongCard from "./SongCard";
import type { Song } from "../types";

interface UserSongListProps {
  songs: Song[];
}

const UserSongList: React.FC<UserSongListProps> = ({ songs }) => {
  return (
    <>
      <div
        className={`flex flex-wrap gap-1 justify-center sm:justify-between lg:justify-normal mt-3 `}
      >
        {songs && songs.map((item, index) => {
          return <SongCard item={item} key={item._id} index={index} />;
        })}
      </div>
    </>
  );
};

export default UserSongList;
