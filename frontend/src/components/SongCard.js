import React, { useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import { spotify } from "../data/data";
const SongCard = () => {
  return (
    <div
      className={`flex flex-wrap gap-1 justify-center sm:justify-between lg:justify-normal`}
    >
      {spotify.map((item, index) => {
        return <SingleItem item={item} index={index} />;
      })}
    </div>
  );
};

export default SongCard;
