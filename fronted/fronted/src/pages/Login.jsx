import axios from "axios";
import { ChevronRight, Lock, ShieldCheck, User, Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAdminAuth } from "../redux/authSlice";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Verifying admin...");

    try {
      await axios.post(
        "http://localhost:8000/users/login", // ✅ CORRECT
        {
          email: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      await dispatch(checkAdminAuth());

      toast.success("Welcome Admin 👋", { id: loadingToast });

      navigate("/admin");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid admin credentials",
        { id: loadingToast }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 selection:bg-yellow-500 selection:text-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-[450px]">
        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-br from-yellow-500/20 via-white/5 to-transparent rounded-[32px]" />

          <div className="relative bg-[#0d1117]/80 backdrop-blur-2xl border border-white/5 p-10 rounded-[30px] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                  Access Username
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Secure Key
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-yellow-500 py-4 font-black uppercase text-[12px] text-black tracking-[0.2em]"
              >
                Verify & Enter{" "}
                <ChevronRight size={16} className="inline ml-2" />
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                <ShieldCheck size={12} className="text-yellow-500" /> Secured
              </div>
              <div className="w-[1px] h-3 bg-white/20" />
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                <Zap size={12} className="text-yellow-500" /> SPL v2.0
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
          Official Sonasade Cricket Federation
        </p>
      </div>
    </div>
  );
}
