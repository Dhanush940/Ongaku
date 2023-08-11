import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImPrevious2, ImNext2 } from "react-icons/im";
import { MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import Playing from "./Playing";
import { FaPlay, FaPause } from "react-icons/fa";
import { addToStorage } from "../redux/actions/songStorage";
import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";
const SongPlayer = () => {
  const { songs } = useSelector((state) => state.songs);
  const { currentSong } = useSelector((state) => state.storage);
  const [play, setPlay] = useState(false);
  const [timeChange, setTimeChange] = useState(false);
  const [time, setTime] = useState(0);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(0.3);

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
    <div className="fixed w-screen h-16 left-0 bottom-0 bg-blue-300 filter blur-[0.4px] rounded-lg p-1 mb-2">
      <div className="bg-[rgb(31,31,31)] h-full pl-10 pr-10 text-white flex justify-between items-center gap-2 ">
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
            <TbRewindBackward5
              size={25}
              onClick={() => {
                audioRef.current.currentTime -= 5;
              }}
            />
            <div onClick={toggleMusic} className="mx-1">
              {play ? <FaPause size={22} /> : <FaPlay size={22} />}
            </div>
            <TbRewindForward5
              size={25}
              onClick={() => {
                audioRef.current.currentTime += 5;
              }}
            />
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

        <div className="flex gap-2">
          {/* <AiOutlineSound size={25} color="" /> */}
          {volume === 0 ? (
            <MdVolumeOff size={25} />
          ) : volume < 0.5 ? (
            <MdVolumeDown size={25} />
          ) : (
            <MdVolumeUp size={25} />
          )}
          <input
            type="range"
            name=""
            id=""
            onChange={volumeCapture}
            className="w-10 sm:w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default SongPlayer;
