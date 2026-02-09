import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../redux/actions/playlistActions";

const CreatePlaylistModal = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("Untitled Playlist");
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleCreate = () => {
    if (inputValue.trim()) {
      dispatch(createPlaylist(inputValue));
      onClose();
      setInputValue("Untitled Playlist");
    }
  };

  return (
    <div className="absolute top-11 -left-14 w-64 h-fit bg-black bg-opacity-90 rounded-md p-2 flex flex-col items-center z-50 shadow-xl border border-zinc-800">
      <div className="w-full relative">
        <RxCross2
          size={20}
          className="absolute -top-1 -right-1 cursor-pointer text-zinc-400 hover:text-white"
          onClick={onClose}
        />
      </div>
      
      <div className="bg-[#1f1f1f] w-full border-b-2 p-2 rounded-md border-b-orange-500 mt-4 mb-3">
        <input
          type="text"
          value={inputValue}
          className="bg-[#1f1f1f] rounded-md w-full focus:outline-none text-white text-sm placeholder-zinc-500"
          placeholder="Playlist Name"
          autoFocus
          onFocus={(e) => e.target.select()}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
      </div>

      <button
        onClick={handleCreate}
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black px-4 py-2 rounded-full font-medium active:scale-95 transition-transform"
      >
        <AiOutlinePlus size={18} />
        <span>Create</span>
      </button>
    </div>
  );
};

export default CreatePlaylistModal;
