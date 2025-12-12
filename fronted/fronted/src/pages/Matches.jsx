import {
  Calendar,
  ChevronRight,
  Clock,
  History,
  MapPin,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- STATIC DATA: THE SPL FIXTURES ---
const STATIC_MATCHES = [
  {
    _id: "m1",
    matchDate: "2025-05-15T10:00:00Z", // 10:00 AM
    venue: "Sonsade Main Ground",
    teamA: {
      name: "Sonsade Warriors",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=warriors",
    },
    teamB: {
      name: "Village Kings",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=kings",
    },
    winner: { name: "Sonsade Warriors" },
  },
  {
    _id: "m2",
    matchDate: "2025-05-16T14:30:00Z", // 02:30 PM
    venue: "Elite Arena",
    teamA: {
      name: "Rising Stars",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=stars",
    },
    teamB: {
      name: "Royal Strikers",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=strikers",
    },
    winner: null,
  },
  {
    _id: "m3",
    matchDate: "2025-05-18T09:00:00Z", // 09:00 AM
    venue: "Sonsade Main Ground",
    teamA: {
      name: "Mighty Lions",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=lions",
    },
    teamB: {
      name: "Ocean 11",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=ocean",
    },
    winner: null,
  },
  {
    _id: "m4",
    matchDate: "2025-05-10T16:00:00Z", // 04:00 PM
    venue: "Local Field",
    teamA: {
      name: "Desert Eagles",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=eagles",
    },
    teamB: {
      name: "Thunder Bolts",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=bolts",
    },
    winner: { name: "Thunder Bolts" },
  },
  {
    _id: "m5",
    matchDate: "2025-12-20T11:00:00Z", // 11:00 AM
    venue: "Sonsade Ground Field",
    teamA: {
      name: "Sonsade",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=eagles",
    },
    teamB: {
      name: "Indapur",
      logo: "https://api.dicebear.com/7.x/identicon/svg?seed=bolts",
    },
    winner: { name: "Sonsade" },
  },
];

// --- SUB-COMPONENT: MATCH CARD ---
const MatchCard = ({ match }) => {
  const isFinished = !!match.winner;

  // Format the Time (e.g., 10:00 AM)
  const formattedTime = new Date(match.matchDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="group relative w-full bg-[#0d1117] rounded-3xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 hover:border-yellow-500/30">
      {/* 1. TOP HEADER: DATE, VENUE & TIME */}
      <div className="grid grid-cols-3 items-center px-4 py-4 bg-white/5 border-b border-white/5 backdrop-blur-md">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar size={12} className="text-yellow-500" />
          <span className="text-[9px] font-black uppercase tracking-wider">
            {new Date(match.matchDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>

        {/* Venue (Center) */}
        <div className="flex items-center justify-center gap-1.5 text-slate-400">
          <MapPin size={12} className="text-yellow-500" />
          <span className="text-[9px] font-black uppercase tracking-wider truncate max-w-[80px]">
            {match.venue}
          </span>
        </div>

        {/* TIME (Right) */}
        <div className="flex items-center justify-end gap-1.5 text-white">
          <Clock size={12} className="text-yellow-500" />
          <span className="text-[9px] font-black uppercase tracking-wider">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* 2. CENTER PIECE: THE BATTLE */}
      <div className="relative flex items-center justify-between p-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-500/5 blur-2xl rounded-full" />

        <div className="flex flex-col items-center gap-3 z-10 w-1/3">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/10 p-1 bg-black overflow-hidden group-hover:border-yellow-500/50 transition-colors shadow-2xl">
            <img
              src={match.teamA.logo}
              alt="teamA"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter text-white text-center leading-tight">
            {match.teamA.name}
          </span>
        </div>

        <div className="flex flex-col items-center z-10">
          <div className="text-4xl md:text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-400/20 to-amber-600/10 group-hover:from-yellow-400 group-hover:to-amber-600 transition-all duration-700">
            VS
          </div>
          {!isFinished && (
            <div className="mt-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
              <span className="text-[8px] font-black text-yellow-500 uppercase tracking-[0.2em] animate-pulse">
                Live Soon
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 z-10 w-1/3">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/10 p-1 bg-black overflow-hidden group-hover:border-yellow-500/50 transition-colors shadow-2xl">
            <img
              src={match.teamB.logo}
              alt="teamB"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter text-white text-center leading-tight">
            {match.teamB.name}
          </span>
        </div>
      </div>

      {/* 3. BOTTOM FOOTER */}
      <div
        className={`px-6 py-4 flex items-center justify-center transition-all ${
          isFinished ? "bg-yellow-500" : "bg-slate-900/50"
        }`}
      >
        {isFinished ? (
          <div className="flex items-center gap-3">
            <Trophy size={16} className="text-black" />
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-black/60 uppercase leading-none">
                Winner Team
              </span>
              <span className="text-xs font-black text-black uppercase tracking-tight">
                {match.winner.name}
              </span>
            </div>
          </div>
        ) : (
          <button className="flex items-center gap-2 text-yellow-500 hover:text-white transition-colors">
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">
              View Match Center
            </span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      <div
        className="absolute inset-0 z-40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
        }}
      />
    </div>
  );
};

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMatches(STATIC_MATCHES);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500 selection:text-black">
      <header className="relative pt-24 pb-16 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-yellow-500/5 blur-[160px] rounded-full pointer-events-none opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            <Clock size={14} className="text-yellow-500" /> Schedule & Timings
          </div>
          <div className="space-y-0">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
              सोनसडे
            </h1>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 italic">
              fixtures
            </h2>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-40">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <History className="text-yellow-500" size={20} />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Live Fixtures
            </h3>
          </div>
          <div className="h-[1px] flex-1 mx-8 bg-white/5" />
          <div className="px-4 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase text-slate-500 tracking-widest border border-white/5">
            {matches.length} Games Total
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-24 opacity-30">
            <div className="w-12 h-12 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest">
              Syncing Scoreboard...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {matches.map((m) => (
              <MatchCard key={m._id} match={m} />
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <Zap size={14} className="text-yellow-500 fill-yellow-500" /> Season 2
          Production
        </div>
        <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.6em]">
          Sonasade Premier League • Official Portal
        </p>
      </footer>
    </div>
  );
}
