import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsSearchHeartFill } from "react-icons/bs";
import { MdLibraryMusic, MdQueueMusic } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import SongPopup from "../components/SongPopup";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const PlaylistSideBar = () => {
  const { id } = useParams();
  const [rotate, setRotate] = useState(id ? true : false);
  const [create, setCreate] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loadingFetchPlaylists, playlists } = useSelector(
    (state) => state.playlist
  );
  // console.log("Sidebar");
  // console.log(id);
  return (
    <div className="flex flex-col gap-2 w-[20%] sm:w-[25%] my-2">
      <div className="h-[20%] bg-[#1f1f1f]  rounded-md p-1.5 sm:p-3 flex flex-col justify-between">
        <Link to="/">
          <div className="flex w-full gap-3 items-center">
            <div className="mr-1 sm:mr-0">
              <AiOutlineHome size={22} color="white" />
            </div>
            <p className="text-white mt-1 sm:block hidden"> Home</p>
          </div>
        </Link>
        <Link to="/search">
          <div className="flex w-full gap-3 items-center">
            <div className="mr-1 sm:mr-0">
              <BsSearchHeartFill size={22} color="white" />
            </div>
            <p className="text-white mt-1 hidden sm:block"> Search</p>
          </div>
        </Link>
      </div>
      <div className="h-[80%] bg-[#1f1f1f]  rounded-md">
        <div className="h-full bg-[#1f1f1f] rounded-md p-1.5 sm:p-3 flex flex-col gap-6 ">
          {/* <Link to="/"> */}
          <div className="flex justify-between items-center">
            <div className="hidden sm:block ">
              <div className="flex gap-3 w-full ">
                {" "}
                <MdQueueMusic
                  size={30}
                  color="white"
                  className=" sm:block hidden"
                />
                <p className="text-white mt-1 hidden md:block"> Your Library</p>
              </div>
            </div>
            <div className=" mr-1 sm:mr-0">
              <AiOutlinePlus
                size={22}
                color="white"
                className=""
                onClick={
                  () => setCreate(!create)
                  //  || console.log("In sidebar")
                }
                title="Add Songs"
              />

              {isAuthenticated ? (
                create ? (
                  <SongPopup create={create} setCreate={setCreate} />
                ) : (
                  <></>
                )
              ) : (
                create &&
                toast.error("You must login to add songs") &&
                setCreate(false)
              )}
            </div>
          </div>

          <div className="h-full overflow-y-auto ">
            <div className="flex justify-between items-center w-full">
              <div className="hidden sm:block ">
                <Link to="/playlists">
                  <div className="flex gap-3 w-full ">
                    <MdLibraryMusic
                      size={22}
                      color="white"
                      className=" sm:block hidden"
                    />
                    <p className="text-white  hidden md:block"> Playlists</p>
                  </div>
                </Link>
              </div>
              <div
                className="mr-1 sm:mr-0 cursor-pointer"
                onClick={() => {
                  setRotate(!rotate);
                }}
              >
                {rotate ? (
                  <RiArrowUpSFill size={22} color="white" className="mt-1" />
                ) : (
                  <RiArrowDownSFill size={22} color="white" className="mt-1" />
                )}
              </div>
            </div>

            {rotate && (
              <div className="w-full mt-3 text-white  gap-2 hidden sm:block ">
                {loadingFetchPlaylists ||
                  playlists?.map((item, index) => {
                    return (
                      <Link to={`/playlist/${item._id}`}>
                        {id && id === item._id ? (
                          <div
                            className={` w-full bg-zinc-700 pl-7 rounded-md h-fit py-2`}
                          >
                            {item.name}{" "}
                          </div>
                        ) : (
                          <div
                            className={` w-full hover:bg-zinc-600 pl-7 rounded-md h-fit py-2`}
                          >
                            {item.name}{" "}
                          </div>
                        )}
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>

          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlaylistSideBar);
