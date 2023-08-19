import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsSearchHeartFill } from "react-icons/bs";
import { MdLibraryMusic, MdQueueMusic } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidPlaylist } from "react-icons/bi";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import SongPopup from "./SongPopup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const SideBar = () => {
  const [rotate, setRotate] = useState(false);
  const [create, setCreate] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  // console.log("Sidebar");
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
          <div className="flex justify-between">
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
            <div className="mr-1 sm:mr-0">
              <AiOutlinePlus
                size={22}
                color="white"
                className="mt-0.5"
                onClick={() => setCreate(!create) || console.log("In sidebar")}
                title="Add Songs"
              />
              {/* {click && (
                <div className="bg-[#4c4b4b] absolute top-10 right-0 w-max flex flex-col justify-between  rounded-sm">
                  <div
                    className="flex gap-1 items-center p-3  hover:bg-slate-600"
                    onClick={() => setClick(false) || setCreate(true)}
                  >
                    <BiSolidPlaylist size={20} color="white" />
                    <span className="text-white">Create a new song</span>
                  </div>
                </div>
              )} */}

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

          <Link to="/playlists">
            <div
              className="flex justify-between items-center h-fit"
              onClick={() => {
                setRotate(!rotate);
              }}
            >
              <div className="hidden sm:block ">
                <div className="flex gap-3 w-full ">
                  <MdLibraryMusic
                    size={22}
                    color="white"
                    className=" sm:block hidden"
                  />
                  <p className="text-white  hidden md:block"> Playlists</p>
                </div>
              </div>
              <div className="mr-1 sm:mr-0">
                {rotate ? (
                  <RiArrowDownSFill size={22} color="white" className="mt-1" />
                ) : (
                  <RiArrowUpSFill size={22} color="white" className="mt-1" />
                )}

                {/* {isAuthenticated ? (
                create ? (
                  <SongPopup create={create} setCreate={setCreate} />
                ) : (
                  <></>
                )
              ) : (
                create &&
                toast.error("You must login to add songs") &&
                setCreate(false)
              )} */}
              </div>
            </div>
          </Link>

          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SideBar);

//Other way to check and throw error
{
  /* {isAuthenticated ||
                (create &&
                  toast.error("You must login to add songs") &&
                  setCreate(false))} */
}

{
  /* {isAuthenticated && create && (
                <SongPopup create={create} setCreate={setCreate} />
              )} */
}

//Might be needed
{
  /* <div className="flex flex-col w-full gap-3 bg-[#4c4b4b]  justify-between p-3 rounded-lg">
                <p className="text-white mt-1 font-bold">
                  Create your first playlist
                </p>
               
                <p className="text-white mt-1"> It's easy,we'll help you</p>
                <button className="p-2 bg-white text-black text-center rounded-xl round w-32 hover:translate-x-0.5 hover:translate-y-0.5">
                  Create Playlist
                </button>
              </div> */
}

{
  /* <div className="flex gap-1 items-center  hover:bg-slate-600 p-3 w-full">
                          <AiOutlineFolderAdd size={20} color="white" />
                          <span className="text-white  ">
                            Create a playlist folder
                          </span>
                        </div> */
}
