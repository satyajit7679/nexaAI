
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/auth/register", {
        name,
        email,
        password: formData.password,
      });

      setSuccess("Account created. OTP has been sent to your email.");

      // Give the user a moment to see the success message before navigating
      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email },
        });
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f14] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#141821] p-8 shadow-2xl">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-slate-400 text-sm mt-2">
              Create your NexaAI account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                disabled={loading}
                autoComplete="name"
                className="w-full rounded-xl bg-[#0d0f14] border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30 disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
                autoComplete="email"
                className="w-full rounded-xl bg-[#0d0f14] border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30 disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength={6}
                disabled={loading}
                autoComplete="new-password"
                className="w-full rounded-xl bg-[#0d0f14] border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30 disabled:opacity-50"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                minLength={6}
                disabled={loading}
                autoComplete="new-password"
                className="w-full rounded-xl bg-[#0d0f14] border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30 disabled:opacity-50"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-white text-black flex items-center justify-center gap-3 font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;