import {
  ChevronRight,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  Trophy,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/bg-2.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for a premium sticky feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Teams", path: "/teams", icon: Users },
    { name: "Players", path: "/players", icon: UserCircle },
    { name: "Matches", path: "/matches", icon: Trophy },
    { name: "Gallery", path: "/gallery", icon: ImageIcon },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
        {/* --- LOGO SECTION --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
            <img
              src={logo}
              alt="SPL Logo"
              className="relative w-12 h-12 md:w-14 md:h-14 object-cover rounded-full border-2 border-green-500/50 shadow-lg shadow-green-500/20"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none">
              SPL <span className="text-green-500 text-sm">2026</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              सोनसडे प्रीमियर लीग
            </span>
          </div>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <ul className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon
                  size={18}
                  strokeWidth={isActive(link.path) ? 2.5 : 2}
                />
                {link.name}
              </Link>
            </li>
          ))}

          <div className="h-6 w-[1px] bg-white/10 mx-2" />

          <li>
            <Link
              to="/admin"
              className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold border border-white/10 hover:bg-slate-700 transition-all shadow-inner"
            >
              <LayoutDashboard size={18} className="text-green-500" />
              Admin
            </Link>
          </li>
        </ul>

        {/* --- MOBILE TOGGLE --- */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      <div
        className={`fixed inset-0 top-[72px] bg-slate-950 z-40 lg:hidden transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              onClick={() => setOpen(false)}
              to={link.path}
              className={`flex items-center justify-between p-4 rounded-2xl border ${
                isActive(link.path)
                  ? "bg-green-600/10 border-green-500/50 text-green-500"
                  : "bg-white/5 border-white/5 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    isActive(link.path)
                      ? "bg-green-600 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <link.icon size={20} />
                </div>
                <span className="font-bold text-lg">{link.name}</span>
              </div>
              <ChevronRight size={20} className="opacity-50" />
            </Link>
          ))}

          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-3 bg-green-600 text-white p-4 rounded-2xl font-black text-lg shadow-xl shadow-green-600/20"
          >
            <LayoutDashboard size={22} />
            ADMIN PANEL
          </Link>
        </div>
      </div>
    </nav>
  );
}
