import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImPrevious2, ImNext2 } from "react-icons/im";
import { MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import Playing from "./Playing";
import { addToStorage } from "../redux/actions/songStorage";
import { FaPause, FaPlay } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";
import OutsideClickHandler from "react-outside-click-handler";
const SongPlayer = () => {
  const { songs } = useSelector((state) => state.songs);
  const { currentSong } = useSelector((state) => state.storage);
  const [play, setPlay] = useState(false);
  const [timeChange, setTimeChange] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [clickedThreeDots, setClickedThreeDots] = useState(false);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("currentSong refreshing");
    // console.log(currentSong);

    setPlay(true);
  }, [currentSong]);

  const toggleMusic = () => {
    if (play) {
      audioRef?.current?.pause();
      setPlay(false);
    } else {
      setPlay(true);
      audioRef?.current?.play();
    }
  };

  const volumeCapture = (e) => {
    audioRef.current.volume = Number(e.target.value) / 100;
    setVolume(audioRef.current.volume);
  };

  const previousSong = () => {
    const previousSongObject = songs.filter((item, currentIndex) => {
      if (item.song === currentSong.song) {
        const object = songs.find((item, index) => index === currentIndex - 1);

        if (!object) {
          return;
        }
        dispatch(
          addToStorage({
            duration: object.duration,
            image: object.image,
            song: object.song,
            title: object.title,
            name: object.name,
          })
        );

        return currentIndex;
      }
    });
    // console.log(" song is :", previousSongObject);
  };

  const nextSong = () => {
    const nextSongObject = songs.filter((item, currentIndex) => {
      if (item.song === currentSong.song) {
        const object = songs.find((item, index) => index === currentIndex + 1);

        if (!object) {
          return;
        }
        dispatch(
          addToStorage({
            duration: object.duration,
            image: object.image,
            song: object.song,
            title: object.title,
            name: object.name,
          })
        );

        return currentIndex;
      }
    });
    // console.log(" song is :", nextSongObject);
  };
  return (
    <div className="fixed w-screen h-16 left-0 bottom-0 bg-blue-300 filter blur-[0.4px] rounded-lg p-1 mb-2 ">
      <div className="bg-[rgb(31,31,31)] h-full  pl-10 pr-10 text-white flex justify-evenly items-center gap-2 ">
        <div className="flex justify-between items-center w-full relative">
          <div className="flex items-center gap-4">
            <img
              src={`${currentSong.image}`}
              className="w-10 h-10 rounded-full"
              alt=""
            />

            <div className="mx-2 flex flex-col ">
              <span className="font-bold text-white hidden sm:block">
                {currentSong.title}
              </span>
              <span className="font-light  text-zinc-400 hidden md:block">
                By {currentSong.name}
              </span>
            </div>

            {/* {currentSong.title} */}
            <audio
              src={`${currentSong.song}`}
              id="audio"
              ref={audioRef}
              autoPlay
              onTimeUpdate={(e) => {
                setTimeChange(true);
                setTime(audioRef.current.currentTime);
                if (e.target.ended) {
                  e.target.currentTime = 0;
                  setPlay(false);
                }
              }}
              onEnded={(e) => {
                nextSong();
              }}
            ></audio>
          </div>

          <div className="flex flex-col gap-1 justify-evenly ">
            <div className="flex gap-3 items-center mx-auto">
              {" "}
              <ImPrevious2 size={30} onClick={previousSong} />
              <div onClick={toggleMusic} className="mx-1">
                {play ? <FaPause size={22} /> : <FaPlay size={22} />}
              </div>
              <ImNext2 size={30} onClick={nextSong} />
            </div>
            <>
              {timeChange && (
                <Playing
                  play={play}
                  audioRef={audioRef}
                  time={time}
                  setTime={setTime}
                />
              )}
            </>
          </div>
          <div className="flex gap-1">
            <div
              className="flex gap-2 p-1.5 rounded-md hover:bg-zinc-600"
              onClick={() => setShowVolumeBar(!showVolumeBar)}
            >
              {/* <AiOutlineSound size={25} color="" /> */}
              {volume === 0 ? (
                <MdVolumeOff size={25} />
              ) : volume < 0.5 ? (
                <MdVolumeDown size={25} />
              ) : (
                <MdVolumeUp size={25} />
              )}
              {/* <input
              type="range"
              name=""
              id=""
              onChange={volumeCapture}
              className="w-10 sm:w-32"
            /> */}
            </div>

            <div
              className="p-1.5 rounded-md hover:bg-zinc-600"
              onClick={() => setClickedThreeDots(!clickedThreeDots)}
            >
              <BsThreeDots size={25} />
            </div>
          </div>

          {showVolumeBar && (
            <OutsideClickHandler
              onOutsideClick={() => setShowVolumeBar(false)}
              display="contents"
            >
              <div className="absolute bg-zinc-700 w-56 h-12 -right-10 bottom-[66px] rounded-md p-1 ">
                <div className="  w-full select-none flex gap-2 items-center justify-center ">
                  <div className="p-1.5 rounded-md hover:bg-zinc-600">
                    {volume === 0 ? (
                      <MdVolumeOff size={25} />
                    ) : volume < 0.5 ? (
                      <MdVolumeDown size={25} />
                    ) : (
                      <MdVolumeUp size={25} />
                    )}
                  </div>

                  <input
                    type="range"
                    name=""
                    id=""
                    value={Math.round(volume * 100)}
                    onChange={volumeCapture}
                    className="w-32"
                  />
                  {console.log(volume)}
                  <span className="ml-2 text-lg">
                    {Math.round(volume * 100)}
                  </span>
                </div>
              </div>
            </OutsideClickHandler>
          )}

          {/* Add relative on the parent container */}
          {clickedThreeDots && (
            <OutsideClickHandler
              display="contents"
              onOutsideClick={() => setClickedThreeDots(false)}
            >
              <div className="absolute bg-zinc-700 w-56 h-60 -right-10 bottom-[66px] rounded-md p-1 ">
                <div className="p-2  w-full hover:bg-neutral-900 hover:rounded-lg select-none">
                  <div
                    className="flex gap-2"
                    onClick={() => {
                      audioRef.current.currentTime -= 5;
                    }}
                  >
                    <TbRewindBackward5 size={25} />
                    <span>Skip Back 5 seconds</span>
                  </div>
                </div>
                <div className="p-2  w-full hover:bg-neutral-900 hover:rounded-lg select-none">
                  <div
                    className="flex gap-2"
                    onClick={() => {
                      audioRef.current.currentTime += 5;
                    }}
                  >
                    <TbRewindForward5 size={25} />
                    <span>Skip Forward 5 seconds</span>
                  </div>
                </div>
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongPlayer;
