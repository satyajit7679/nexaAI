import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice";
import SideBar from "../components/SideBar";
import ChatArea from "../components/ChatArea";
import Artifact from "../components/Artifact";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserdata(data));
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await handleLogin(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">

      <SideBar />
      <ChatArea />
      <Artifact />

      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

          <div className="w-[360px] rounded-2xl border border-white/10 bg-[#141821] p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-2">
              Welcome to nexaAI
            </h2>

            <p className="text-slate-400 text-sm mb-6">
              Login with your Google account to continue using your AI workspace.
            </p>

            <button
              onClick={googleLogin}
              className="w-full h-12 rounded-xl bg-white text-black flex items-center justify-center gap-3 font-medium hover:bg-gray-200 transition"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default Home;