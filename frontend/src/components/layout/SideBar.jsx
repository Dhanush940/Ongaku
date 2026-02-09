import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsSearchHeartFill } from "react-icons/bs";
import { MdLibraryMusic, MdQueueMusic } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidPlaylist } from "react-icons/bi";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import SongUploadModal from "../../features/player/components/SongUploadModal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const SideBar = () => {
  const [rotate, setRotate] = useState(false);
  const [create, setCreate] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

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
                onClick={() => setCreate(!create)}
                title="Add Songs"
              />

              {isAuthenticated ? (
                create ? (
                  <SongUploadModal create={create} setCreate={setCreate} />
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
