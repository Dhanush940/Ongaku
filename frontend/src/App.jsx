import HomePage from "./features/home/pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./features/auth/pages/SignupPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivationPage from "./features/auth/pages/ActivationPage";
import { useEffect } from "react";
import Store from "./store/store";
import { loadUser } from "./features/auth/redux/actions/userActions";
import { useDispatch } from "react-redux";
import { loadSongs } from "./features/song/redux/actions/songActions";
import PlaylistPage from "./features/playlist/pages/PlaylistPage";
import SpecificPlaylist from "./features/playlist/pages/SpecificPlaylistPage";
import { getPlaylists } from "./features/playlist/redux/actions/playlistActions";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    Store.dispatch(loadSongs());
    Store.dispatch(getPlaylists());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/resetPassword/:token" element={<ResetPasswordPage />} />

        <Route path="/playlists" element={<PlaylistPage />} />
        <Route path="/playlist/:id" element={<SpecificPlaylist />} />
      </Routes>
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
