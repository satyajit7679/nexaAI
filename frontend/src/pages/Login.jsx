// import { signInWithPopup } from "firebase/auth";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { useDispatch } from "react-redux";
// import { auth, googleProvider } from "../../utils/firebase";
// import api from "../../utils/axios";
// import { setUserdata } from "../redux/userSlice";

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const token = await result.user.getIdToken();
//       const { data } = await api.post("/api/auth/login", { token });
//       dispatch(setUserdata(data));
//       navigate("/chat");
//     } catch (loginError) {
//       if (loginError?.code !== "auth/popup-closed-by-user") {
//         setError(loginError?.response?.data?.message || "Unable to sign in");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailLogin = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { data } = await api.post("/api/auth/email-login", formData);
//       dispatch(setUserdata(data));
//       navigate("/chat");
//     } catch (loginError) {
//       setError(loginError?.response?.data?.message || "Unable to sign in");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
//       <section className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-white">Welcome back</h1>
//           <p className="mt-2 text-gray-400">Sign in to your NexaAI account</p>
//         </div>

//         {error && (
//           <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
//             {error}
//           </p>
//         )}

//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-white font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           <FcGoogle size={20} />
//           {loading ? "Signing in..." : "Continue with Google"}
//         </button>

//         <div className="my-6 flex items-center gap-3 text-xs text-gray-500">
//           <span className="h-px flex-1 bg-gray-800" />
//           OR
//           <span className="h-px flex-1 bg-gray-800" />
//         </div>

//         <form onSubmit={handleEmailLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email address"
//             value={formData.email}
//             onChange={(event) =>
//               setFormData({ ...formData, email: event.target.value })
//             }
//             required
//             className="h-12 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 text-white outline-none focus:border-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(event) =>
//               setFormData({ ...formData, password: event.target.value })
//             }
//             required
//             className="h-12 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 text-white outline-none focus:border-blue-500"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="h-12 w-full rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {loading ? "Signing in..." : "Sign in with email"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-400">
//           Need an account?{" "}
//           <Link to="/signup" className="text-blue-400 hover:text-blue-300">
//             Sign up
//           </Link>
//         </p>
//       </section>
//     </main>
//   );
// }

// export default Login;

import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { setUserdata } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFieldChange = (field) => (event) => {
    setError("");
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserdata(data));
      navigate("/chat");
    } catch (loginError) {
      if (loginError?.code !== "auth/popup-closed-by-user") {
        setError(loginError?.response?.data?.message || "Unable to sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/api/auth/email-login", {
        email,
        password,
      });
      dispatch(setUserdata(data));
      navigate("/chat");
    } catch (loginError) {
      setError(loginError?.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0d0f14] px-4">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141821] p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-slate-400 text-sm">
            Sign in to your NexaAI account
          </p>
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FcGoogle size={20} />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
          <span className="h-px flex-1 bg-white/10" />
          OR
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <form
          onSubmit={handleEmailLogin}
          className="space-y-4"
          autoComplete="off"
        >
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleFieldChange("email")}
            required
            disabled={loading}
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-white/10 bg-[#0d0f14] px-4 text-white outline-none focus:border-white/30 disabled:opacity-50"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFieldChange("password")}
            required
            disabled={loading}
            autoComplete="new-password"
            className="h-12 w-full rounded-xl border border-white/10 bg-[#0d0f14] px-4 text-white outline-none focus:border-white/30 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-white font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in with email"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Need an account?{" "}
          <Link to="/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
