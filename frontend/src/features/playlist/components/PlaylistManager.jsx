import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillArrowRightCircleFill, BsPlay } from "react-icons/bs";
import { BiDotsHorizontalRounded, BiSolidRename } from "react-icons/bi";
import { MdLibraryMusic } from "react-icons/md";
import { RxCross1, RxCross2 } from "react-icons/rx";
import {
  addSongsInPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  renamePlaylist,
} from "../redux/actions/playlistActions";
import { RiMusicFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { getPlaylistDetailsPath } from "../../../constants/routes";

/**
 * PlaylistManager - Displays and manages user playlists.
 * Header and layout are provided by PlaylistLayout.
 */
const PlaylistManager = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { songs } = useSelector((state) => state.songs);
  const [createPlaylistDialogue, setCreatePlaylistDialogue] = useState(false);
  const [inputValue, setInputValue] = useState("Untitled Playlist");
  const [renameValue, setRenameValue] = useState("");
  const [hoverOverDiv, setHoverOverDiv] = useState(-1);
  const [clickOnDiv, setClickOnDiv] = useState(-1);
  const [playlistSettings, setPlaylistSettings] = useState(false);
  const [addSongsDialogue, setAddSongsDialogue] = useState(false);
  const [songDialogueInput, setSongDialogueInput] = useState("");
  const [currentPlaylistToAddSongsTo, setCurrentPlaylistToAddSongsTo] =
    useState(-1);
  const { playlists } = useSelector((state) => state.playlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylists());
  }, [dispatch]);

  const validateUserInput = (inputString) => {
    let maximumAllowedNumber = songs.length;
    const inputArray = inputString.split(",");
    const numbersArray = [];

    for (const item of inputArray) {
      const trimmedItem = item.trim();
      const parsedNumber = parseFloat(trimmedItem);

      if (
        !isNaN(parsedNumber) &&
        Number.isInteger(parsedNumber) &&
        parsedNumber <= maximumAllowedNumber
      ) {
        numbersArray.push(parsedNumber);
      }
    }

    return [...new Set(numbersArray)].sort((a, b) => a - b);
  };

  return (
    <div className="text-white w-full h-full px-14 py-5">
      <span className="text-white m-1 text-5xl">Playlists</span>

      {playlists?.length > 0 ? (
        <div className="relative">
          <div
            className="p-2 rounded-md bg-orange-500 flex gap-2 w-fit my-3 mt-5 ml-1.5 z-50 hover:opacity-90 text-black"
            onClick={() => {
              setCreatePlaylistDialogue(!createPlaylistDialogue);
              setInputValue("Untitled Playlist");
            }}
          >
            <AiOutlinePlus size={20} color="black" className="mt-0.5" />
            <button className="hover:cursor-default">New playlist</button>
          </div>
          {createPlaylistDialogue && (
            <div className=" w-64 h-fit bg-black opacity-90 absolute top-11 -left-14 rounded-md p-2 flex flex-col items-center z-50">
              <div
                className="bg-[#1f1f1f] w-60 border-b-2 p-1 pl-4 rounded-md border-b-orange-500
                 "
              >
                <input
                  type="text"
                  value={inputValue}
                  name=""
                  id=""
                  className="bg-[#1f1f1f] rounded-md w-[90%]focus:outline-none
                    focus:border-2  focus:border-blue-200 outline-none
                     border-2 border-zinc-500"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div
                className="p-2 rounded-md bg-orange-500 flex gap-2 w-fit mt-3 hover:opacity-90 text-black"
                onClick={() => {
                  dispatch(createPlaylist(inputValue));
                  setCreatePlaylistDialogue(false);
                  setInputValue("");
                }}
              >
                <button className="hover:cursor-default">
                  Create playlist
                </button>
              </div>
              <div className="absolute top-4 right-7">
                <RxCross2 size={20} onClick={() => setInputValue("")} />
              </div>
            </div>
          )}
          <div className=" flex flex-wrap">
            {playlists.map((item, index) => {
              return (
                <div
                  className="p-1.5 my-2 h-fit hover:bg-neutral-700 relative rounded-md"
                  key={index}
                  onMouseOver={() => setHoverOverDiv(index)}
                  onMouseOut={() => setHoverOverDiv(-1)}
                >
                  <div
                    className={`flex flex-col bg-[#151515] p-1 w-40 h-40 text-white rounded-sm  group relative`}
                  >
                    <img
                      src="/bg-image.png"
                      alt=""
                      className="absolute top-16 left-16 w-8 h-8"
                    />
                    {index === hoverOverDiv && (
                      <div className="absolute top-2 left-3">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className=" ml-2 w-[18px] h-[18px] rounded-md"
                        />
                      </div>
                    )}
                    {index === hoverOverDiv && (
                      <Link to={getPlaylistDetailsPath(playlists[index]._id)}>
                        <div
                          className="absolute top-28 left-3 w-9 h-9 flex justify-center items-center rounded-3xl
                      bg-white bg-opacity-5 hover:bg-slate-200 hover:bg-opacity-10
                      border-2
                      border-slate-800"
                        >
                          <BsPlay size={22} />
                        </div>
                      </Link>
                    )}

                    {index === hoverOverDiv && (
                      <div
                        className="absolute top-28 right-2 w-10 h-10 flex justify-center items-center rounded-3xl
                      bg-white bg-opacity-5 hover:bg-slate-200 hover:bg-opacity-10
                      border-2
                      border-slate-800"
                        onClick={() =>
                          setPlaylistSettings(!playlistSettings) ||
                          setClickOnDiv(index) ||
                          setRenameValue("") ||
                          setCurrentPlaylistToAddSongsTo(-1)
                        }
                      >
                        <BiDotsHorizontalRounded size={22} />
                      </div>
                    )}

                    {clickOnDiv === index && playlistSettings && (
                      <div className="absolute bg-zinc-700 w-36 h-fit -right-10 bottom-[66px] rounded-md p-1 z-50">
                        <div className="p-2  w-full hover:bg-neutral-900 hover:rounded-lg select-none">
                          {currentPlaylistToAddSongsTo > -1 &&
                          currentPlaylistToAddSongsTo === index ? (
                            <div className="flex items-center justify-between gap-2">
                              <input
                                className="p-3
                                   w-[90px] h-5 rounded-md outline-none border-2 border-blue-30 bg-neutral-600"
                                value={renameValue}
                                onChange={(e) =>
                                  setRenameValue(e.target.value)
                                }
                                onFocus={(e) => e.target.select()}
                              ></input>
                              <BsFillArrowRightCircleFill
                                size={20}
                                color="white"
                                onClick={() => {
                                  setRenameValue("");
                                  setPlaylistSettings(false);
                                  dispatch(
                                    renamePlaylist(
                                      renameValue,
                                      playlists[currentPlaylistToAddSongsTo]
                                    )
                                  );
                                  dispatch(getPlaylists());
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              className="flex gap-2 items-center "
                              onClick={() =>
                                setCurrentPlaylistToAddSongsTo(index)
                              }
                            >
                              <BiSolidRename size={25} />
                              <span className="text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent  bg-clip-text">
                                Rename
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-2  w-full hover:bg-neutral-900 hover:rounded-lg select-none ">
                          <div
                            className="flex gap-2 items-center "
                            onClick={() => {
                              dispatch(deletePlaylist(playlists[index]));
                              setPlaylistSettings(false);
                            }}
                          >
                            <AiOutlineDelete size={25} />
                            <span className="text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent  bg-clip-text">
                              Delete
                            </span>
                          </div>
                        </div>

                        <div className="p-2  w-full hover:bg-neutral-900 hover:rounded-lg select-none">
                          <div
                            className="flex gap-2 items-center "
                            onClick={() => {
                              setCurrentPlaylistToAddSongsTo(index);
                              setPlaylistSettings(false);
                              setAddSongsDialogue(true);
                            }}
                          >
                            <RiMusicFill size={25} color="white" />
                            <span className="text-lg  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent  bg-clip-text">
                              Add Songs
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {addSongsDialogue && (
                      <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center z-50 bg-[#181616da] opacity-75 ">
                        <div className="bg-black w-full sm:w-7/12  md:w-[62%] lg:w-[50%] xl:w-1/3  h-fit rounded-md px-6 py-2 relative  ">
                          <h1 className="text-white text-center text-2xl my-2">
                            Add songs to the current playlist
                          </h1>

                          <RxCross1
                            className="absolute top-3 right-3"
                            color="white"
                            size={25}
                            onClick={() => setAddSongsDialogue(false)}
                          />

                          <form
                            className="space-y-3 "
                            onSubmit={(e) => {
                              e.preventDefault();

                              dispatch(
                                addSongsInPlaylist(
                                  validateUserInput(songDialogueInput),
                                  playlists[currentPlaylistToAddSongsTo]
                                )
                              );
                            }}
                          >
                            <div>
                              <input
                                type="text"
                                value={`${songDialogueInput}`}
                                className="px-3 py-2 bg-zinc-800 rounded-md w-full text-white border-zinc-800 outline-none border-2 focus:border-blue-200"
                                placeholder="Song Index Number/s"
                                required
                                onChange={(e) => {
                                  setSongDialogueInput(e.target.value);
                                }}
                              />
                            </div>
                            <div className="text-white text-sm ml-2">
                              Type in the index number of the songs you want
                              to add to your current playlist separated by
                              comma.
                            </div>

                            <div className="text-white text-sm ml-2">
                              Index number of a song can be found on the
                              bottom right corner of the song on home page.
                            </div>

                            <div>
                              <button
                                type="submit"
                                className="bg-green-500 rounded-full h-10 w-full hover:bg-green-400 active:scale-95"
                              >
                                Create
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    {" "}
                    <span className="mb-2"> {item.name}</span>
                    <br />
                    <span className="mb-2">
                      {`${playlists[index].playlistSongs.length}`} songs
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full h-[80%] flex justify-center items-center text-white gap-3">
          <MdLibraryMusic
            size={150}
            color="white"
            className="relative bottom-10 sm:block "
          />
          <div className="relative -top-5">
            <span className="text-white text-3xl ">
              You dont' have any playlists
            </span>
            <div
              className="p-2 rounded-md bg-orange-500 flex gap-2 w-fit mt-3 hover:opacity-90 text-black"
              onClick={() => {
                isAuthenticated
                  ? setCreatePlaylistDialogue(!createPlaylistDialogue) ||
                    setInputValue("Untitled Playlist")
                  : toast.error("Please login to create playlist");
              }}
            >
              <AiOutlinePlus size={20} color="black" className="mt-0.5" />
              <button className="hover:cursor-default">
                Create a new playlist
              </button>
            </div>

            {createPlaylistDialogue && (
              <div className=" w-72 h-fit bg-black opacity-90 absolute top-[90px] -left-10 rounded-md p-2 flex flex-col items-center  ">
                <div
                  className="bg-[#1f1f1f] w-60
                  border-b-2 p-1 pl-4 rounded-md border-b-orange-500
                 "
                >
                  <input
                    type="text"
                    value={inputValue}
                    name=""
                    id=""
                    className="bg-[#1f1f1f] rounded-md w-[90%]
                  focus:outline-none border-2
                  border-[#1f1f1f]
                 "
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>

                <div
                  className="p-2 rounded-md bg-orange-500 flex gap-2 w-fit mt-3 hover:opacity-90 text-black"
                  onClick={() => {
                    dispatch(createPlaylist(inputValue));

                    setCreatePlaylistDialogue(false);
                    setInputValue("");
                  }}
                >
                  <AiOutlinePlus size={20} color="black" className="mt-0.5" />
                  <button className="hover:cursor-default">
                    Create playlist
                  </button>
                </div>
                <div className="absolute top-4 right-7">
                  <RxCross2 size={20} onClick={() => setInputValue("")} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistManager;
