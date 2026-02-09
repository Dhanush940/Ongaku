import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";
import { spotify } from "../../../data/data";
const SongCard = () => {
  return (
    <div
      className={`flex flex-wrap gap-1 justify-center sm:justify-between lg:justify-normal`}
    >
      {spotify.map((item, index) => {
        return <SongCard item={item} index={index} />;
      })}
    </div>
  );
};

export default SongCard;
