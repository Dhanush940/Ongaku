import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addSongsInPlaylist } from "../../playlistThunks";

const AddSongsToPlaylistModal = ({ isOpen, onClose, playlist }) => {
  const [inputString, setInputString] = useState("");
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.songs);

  if (!isOpen) return null;

  const validateUserInput = (input) => {
    if (!input) return [];

    const uniqueIndices = new Set();

    input.split(",").forEach((item) => {
      const num = parseInt(item.trim(), 10);
      // UI displays 1-based index, backend action expects 1-based index (it subtracts 1)
      if (!isNaN(num) && num >= 1 && num <= songs.length) {
        uniqueIndices.add(num);
      }
    });

    return Array.from(uniqueIndices).sort((a, b) => a - b);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const songIndices = validateUserInput(inputString);

    if (songIndices.length > 0) {
      // Logic moved to component: Filter songs based on 1-based indices locally
      // Thunk expects PREPARED data (filteredSongs), not raw indices
      const filteredSongs = songs.filter((_, index) => 
        songIndices.includes(index + 1)
      );

      if (filteredSongs.length > 0) {
        dispatch(addSongsInPlaylist({ filteredSongs, playlist }));
        onClose();
        setInputString("");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl p-6 relative shadow-2xl border border-zinc-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add Songs to Playlist
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Song Indexes (comma-separated)
            </label>
            <input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              placeholder="e.g., 1, 4, 12"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
              autoFocus
            />
            <p className="text-xs text-zinc-500 mt-2">
              Find the index number at the bottom right of each song card on the home page.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-full transition-colors active:scale-95"
          >
            Add Songs
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSongsToPlaylistModal;
