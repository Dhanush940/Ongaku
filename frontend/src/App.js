import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivationPage from "./pages/ActivationPage";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useDispatch } from "react-redux";
import { loadSongs } from "./redux/actions/song";
import PlaylistPage from "./pages/PlaylistPage";
import SpecificPlaylist from "./pages/SpecificPlaylist";
import { getPlaylists } from "./redux/actions/playlist";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    Store.dispatch(loadSongs());
    Store.dispatch(getPlaylists());
    // dispatch(removeFromStorage());
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
