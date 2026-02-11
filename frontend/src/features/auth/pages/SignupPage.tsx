import React, { useState, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { SiMusicbrainz } from "react-icons/si";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../userThunks";
import type { AppDispatch } from "../../../store/store";

const SignupPage = () => {
  const { t } = useTranslation('auth');
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      if (!avatar) {
        toast.error(t('upload_avatar'));
        // return; // Optional: Enforce avatar requirement?
      }

      const resultAction = await dispatch(registerUser({
        name,
        email,
        password,
        avatar: avatar || undefined, // handle null
      }));

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload); // Success message from backend
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
      } else {
        toast.error(resultAction.payload || t('registration_failed'));
      }
    } catch (err) {
      toast.error(t('registration_error'));
      console.error(err);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };

    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div className="w-screen h-screen  bg-gray-600">
      <div className="h-[10vh] bg-black pl-12 flex">
        <Link to="/">
          {" "}
          <div className="flex items-center mt-1.5">
            <SiMusicbrainz size={40} color="white" />
            <span className="font-extrabold text-white text-2xl">{t('app_name', { ns: 'common' })}</span>
          </div>
        </Link>
      </div>

      <h1 className="mt-4 text-center text-white font-bold text-3xl ">
        {t('register_title')}
      </h1>

      <div className="mt-4 sm:mx-auto  sm:max-w-md ">
        <div className="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                {t('full_name')}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
                  focus:border-4
                  bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                {t('email_address')}
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
                  focus:border-4
                  bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                {t('password')}
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
                  focus:border-4
                  bg-slate-800 text-white"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    color="white"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    color="white"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="file-input"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full
                     "
                    />
                  ) : (
                    <RxAvatar
                      className="h-8 w-8
                    bg-white"
                    />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-slate-200 cursor-pointer"
                >
                  <span>{t('upload_file')}</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {t('submit')}
              </button>
            </div>
            <div className="flex items-center w-full">
              <h4 className="text-white">{t('already_have_account')}</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                {t('sign_in')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
