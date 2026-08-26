// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import api from "../../utils/axios";

// function VerifyOtp() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState(location.state?.email || "");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await api.post("/api/auth/verify-otp", { email, otp });
//       navigate("/login", {
//         state: { message: "Email verified. You can now log in." },
//       });
//     } catch (verificationError) {
//       setError(
//         verificationError.response?.data?.message || "Unable to verify email",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
//       <section className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-white">Verify your email</h1>
//           <p className="mt-2 text-gray-400">
//             Enter the OTP sent to your email.
//           </p>
//         </div>

//         {error && (
//           <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="mt-8 space-y-4">
//           <input
//             type="email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//             placeholder="Email address"
//             required
//             className="h-12 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 text-white outline-none focus:border-blue-500"
//           />
//           <input
//             type="text"
//             value={otp}
//             onChange={(event) =>
//               setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
//             }
//             placeholder="6-digit OTP"
//             inputMode="numeric"
//             required
//             className="h-12 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 text-white outline-none focus:border-blue-500"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="h-12 w-full rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {loading ? "Verifying..." : "Verify email"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-400">
//           Already verified?{" "}
//           <Link to="/login" className="text-blue-400 hover:text-blue-300">
//             Log in
//           </Link>
//         </p>
//       </section>
//     </main>
//   );
// }

// export default VerifyOtp;



import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    setError("");
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setError("");
    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    if (otp.length !== 6) {
      setError("Enter the complete 6-digit OTP");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/verify-otp", { email: trimmedEmail, otp });
      navigate("/login", {
        state: { message: "Email verified. You can now log in." },
      });
    } catch (verificationError) {
      setError(
        verificationError.response?.data?.message || "Unable to verify email",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0d0f14] px-4">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141821] p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Verify your email</h1>
          <p className="mt-2 text-slate-400 text-sm">
            Enter the OTP sent to your email.
          </p>
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email address"
            required
            disabled={loading}
            autoComplete="email"
            className="h-12 w-full rounded-xl border border-white/10 bg-[#0d0f14] px-4 text-white outline-none focus:border-white/30 disabled:opacity-50"
          />
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="6-digit OTP"
            inputMode="numeric"
            required
            disabled={loading}
            autoComplete="one-time-code"
            className="h-12 w-full rounded-xl border border-white/10 bg-[#0d0f14] px-4 text-white tracking-widest outline-none focus:border-white/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-white font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify email"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already verified?{" "}
          <Link to="/login" className="text-white hover:underline">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default VerifyOtp;