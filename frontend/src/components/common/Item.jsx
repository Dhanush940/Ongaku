import React from "react";
import SongCard from "../../features/song/components/SongWrapper";

const Item = () => {
  return (
    <>
      {" "}
      <div className="flex justify-between text-white">
        <h2 className="hover:underline font-bold">Spotify Playlists</h2>
        <span className="hover:underline">Show all</span>
      </div>
      <SongCard />
    </>
  );
};

export default Item;
