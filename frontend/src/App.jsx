import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Store from "./store/store";
import { loadUser } from "./features/auth/userThunks";
import { loadSongs } from "./features/song/songThunks";
import { getPlaylists } from "./features/playlist/playlistThunks";
import { AppRoutes } from "./routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize app data on mount
    dispatch(loadUser());
    Store.dispatch(loadSongs());
    Store.dispatch(getPlaylists());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
