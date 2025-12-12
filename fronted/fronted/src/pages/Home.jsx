import {
  BarChart3,
  ChevronRight,
  PlayCircle,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import cricketImg from "../assets/cricket.jpeg";

function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      {/* --- PREMIUM AMBIENT GLOWS --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-green-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -right-20 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-20">
        {/* --- HERO HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-green-500/30 text-green-400 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-green-900/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Season 2 • 2025 Live
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
            सोनसडे <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 drop-shadow-sm">
              प्रीमियर लीग
            </span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            The heart of village cricket. Experience every boundary, every
            wicket, and every moment of glory in{" "}
            <span className="text-white">Real-Time.</span>
          </p>
        </div>

        {/* --- FEATURED BANNER (High Depth) --- */}
        <div className="relative group max-w-5xl mx-auto mb-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-slate-900">
            <img
              src={cricketImg}
              alt="Cricket SPL Banner"
              className="w-full h-full object-cover opacity-90 scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-white/5" />

            {/* Floating Live Badge */}
            <div className="absolute top-6 right-6">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-black tracking-widest uppercase">
                  Live Center
                </span>
              </div>
            </div>

            {/* Banner Content */}
            <div className="absolute bottom-8 left-8 md:left-12">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <Trophy size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-green-400 font-black tracking-[0.2em] mb-1">
                    Grand Championship
                  </p>
                  <h2 className="text-xl font-black text-white">
                    SPL 2025 SEASON TROPHY
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ACTION CARDS (The "Shaded Icon" Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Teams */}
          <Link
            to="/teams"
            className="group relative bg-slate-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-[2rem] hover:bg-slate-800/60 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 shadow-[inset_0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                  <Users size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                    Team Sonsade
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Explore all participating village teams and squads.
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <ChevronRight size={20} />
              </div>
            </div>
          </Link>

          {/* Card 2: Players */}
          <Link
            to="/players"
            className="group relative bg-slate-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-[2rem] hover:bg-slate-800/60 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400 shadow-[inset_0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
                  <BarChart3 size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors">
                    Player Stats
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Check out the orange and purple cap leaders.
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <ChevronRight size={20} />
              </div>
            </div>
          </Link>
        </div>

        {/* --- FINAL CTA --- */}
        <div className="mt-20 text-center">
          <Link
            to="/matches"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_-15px_rgba(22,163,74,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <PlayCircle size={28} className="fill-white/20" />
            ENTER LIVE ARENA
          </Link>
          <div className="mt-6 flex justify-center items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold tracking-widest uppercase">
              <Star size={14} className="text-yellow-500" />
              Professional Stats
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold tracking-widest uppercase">
              <Zap size={14} className="text-green-500" />
              Instant Updates
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
