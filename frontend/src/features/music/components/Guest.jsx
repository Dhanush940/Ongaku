import React, { useState } from "react";
import { spotify } from "../../../data/data";
import { FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
const Guest = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className="text-white mx-3 mt-5 flex justify-between flex-wrap">
      {spotify.map((item, index) => {
        return (
          <div className="p-2 m-2" key={index}>
            <div
              className="flex flex-col bg-[#151515] p-3 w-40 h-64 text-white rounded-lg hover:bg-[rgba(97,79,79,0.64)] relative group "
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(-1)}
            >
              <img
                src={item.image}
                alt=""
                className="rounded-lg relative h-[150px]"
              />
              {hover === index && (
                <div
                  className="bg-green-600 w-12 h-12 absolute top-24 right-5 rounded-full flex items-center justify-center pl-1  hover:scale-110 "
                  onClick={() => {
                    toast.error("You must login ");
                  }}
                >
                  <FaPlay size={25} color="black" />
                </div>
              )}
              <span className="font-bold m-1  ">{item.text1}</span>
              <span className="font-light m-1 text-zinc-400">
                {item.text2?.length > 20
                  ? item.text2.substring(0, 20) + "..."
                  : item.text2}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Guest;
