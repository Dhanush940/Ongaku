import React, { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { backend_server } from "../server";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadSongs } from "../redux/actions/song";
const SongPopup = ({ create, setCreate }) => {
  const [store, setStore] = useState({
    title: "",
    name: "",
    song: "",
    image: "",
  });
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const songRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("store is:" + store);
    // for (let key in store) {
    //   console.log(`Key :${key},Value :${store[key]}`);
    // }
    // console.log({ ...store });

    axios
      .post(
        `${backend_server}/song/create-song`,
        store,
        { withCredentials: true }
        // If not mentioned, cookies and all will not be passed to in the req object
      )
      .then(({ data }) => {
        setStore({
          title: "",
          name: "",
          song: "",
          image: "",
        });
        imageRef.current.value = "";
        songRef.current.value = "";
        toast.success(data?.message);
        dispatch(loadSongs());
      })
      .catch((err) => toast.error(err.response?.data?.message));
  };

  const handleFileChange = (e) => {
    // console.log(e.target.files);
    const reader = new FileReader();
    // console.log(e.target.accept.includes("audio"));
    reader.onload = () => {
      if (e.target.accept.includes("audio") && reader.readyState === 2) {
        setStore({ ...store, song: reader.result });
      } else if (reader.readyState === 2) {
        setStore({ ...store, image: reader.result });
      }
    };
    // console.log(e.target.files.length);
    e.target.files.length > 0 && reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center z-50 bg-[#181616da]">
      <div className="bg-black   w-1/2 lg:w-1/3 h-4/5 rounded-md px-6 py-2 relative ">
        <h1 className="text-white text-center text-2xl my-2">Add a song</h1>

        <RxCross1
          className="absolute top-3 right-3"
          color="white"
          size={25}
          onClick={() => setCreate(false)}
        />

        <form className="space-y-7 " onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              type="text"
              value={`${store.title}`}
              className="px-3 py-2 bg-zinc-800 rounded-md w-full text-white border-zinc-800 outline-none border-2 focus:border-blue-200"
              placeholder="Song Title"
              required
              onChange={(e) => {
                setStore({ ...store, title: e.target.value });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              value={`${store.name}`}
              className="px-3 py-2 bg-zinc-800 rounded-md w-full text-white border-zinc-800 outline-none border-2 focus:border-blue-200"
              placeholder="Artist Name"
              required
              onChange={(e) => {
                setStore({ ...store, name: e.target.value });
              }}
            />
          </div>
          <div>
            <span className="block text-white my-2">Uplaod an mp3 file</span>
            <div>
              <input
                type="file"
                className="px-3 py-2 bg-zinc-800 rounded-md w-full text-white border-zinc-800 outline-none border-2 "
                accept=".mp3,audio/*"
                required
                onChange={handleFileChange}
                ref={songRef}
              />
            </div>
          </div>
          <div>
            <span className="block text-white  my-2">Select an image</span>
            <input
              type="file"
              className="px-3 py-2 bg-zinc-800 rounded-md w-full text-white border-zinc-800 outline-none border-2 "
              accept=".jpg,.jpeg,.png"
              required
              onChange={handleFileChange}
              ref={imageRef}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 rounded-full h-10 w-full 
            hover:bg-green-400
            active:translate-y-1"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default SongPopup;
