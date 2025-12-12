import axios from "axios";
import {
  Award,
  Filter,
  LayoutGrid,
  Search,
  Shield,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// --- SUB-COMPONENT: ELITE PLAYER CARD ---
const PlayerCard = ({ player }) => {
  return (
    <div className="group relative w-full aspect-[0.7] transition-all duration-500 hover:-translate-y-3">
      {/* 1. OUTER GLOW BORDER */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-yellow-400/40 via-yellow-500/10 to-transparent rounded-2xl transition-all group-hover:via-yellow-400/60" />

      {/* 2. MAIN CARD CONTAINER */}
      <div className="relative h-full w-full bg-[#0d1117] rounded-[18px] overflow-hidden shadow-2xl flex flex-col border border-white/5">
        {/* Background Depth Graphic */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 60%)" }}
          />
        </div>

        {/* 3. TOP INFO (Jersey & Role) */}
        <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-4xl font-black italic text-white/90 leading-none tracking-tighter">
              {player.number}
            </span>
            <div className="h-1 w-8 bg-yellow-500 mt-1 shadow-[0_0_10px_#eab308]" />
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg">
            <span className="text-[10px] font-black text-yellow-500 tracking-widest uppercase">
              {player.role}
            </span>
          </div>
        </div>

        {/* 4. PLAYER IMAGE SECTION */}
        <div className="relative flex-1 flex items-end justify-center overflow-hidden pt-12">
          {player.image ? (
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 z-0"
            />
          ) : (
            <User size={140} className="text-slate-800 mb-10" />
          )}

          {/* Bottom Fade - Blends photo into the card background */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent z-10" />
        </div>

        {/* 5. NAMEPLATE (Skewed Broadcast Look) */}
        <div className="absolute bottom-[72px] left-0 right-0 z-20 px-4">
          <div className="inline-block transform -skew-x-12 bg-yellow-500 px-5 py-1.5 shadow-[5px_10px_20px_rgba(0,0,0,0.5)] border-r-4 border-black/20">
            <h3 className="transform skew-x-12 text-base font-black uppercase text-black leading-none tracking-tight">
              {player.name}
            </h3>
          </div>
        </div>

        {/* 6. BOTTOM DATA STRIP */}
        <div className="relative z-30 bg-[#161b22] border-t border-white/10 p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Shield size={10} className="text-yellow-500" /> Team
            </span>
            <span className="text-sm font-black text-white truncate max-w-[110px]">
              {player.teamName}
            </span>
          </div>

          <div className="flex gap-4 border-l border-white/5 pl-4">
            <div className="text-center">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">
                Age
              </span>
              <span className="text-sm font-black text-yellow-500">
                {player.age}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[9px] font-bold text-slate-400 uppercase block flex items-center gap-1">
                <Zap size={10} /> Season
              </span>
              <span className="text-sm font-black text-yellow-500 text-nowrap">
                S2-2026             </span>
            </div>
          </div>
        </div>

        {/* 7. HOLOGRAPHIC SHINE EFFECT */}
        <div
          className="absolute inset-0 z-40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
          }}
        />
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const PlayerStatsPage = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/teams/getallplayers");
      const formatted = res.data.players.map((p, index) => ({
        id: p._id || index,
        name: p.name || "UNKNOWN PLAYER",
        number: p.jerseyNumber || "00",
        role: p.role?.toUpperCase() || "PLAYER",
        teamName: p.team?.name || "FREE AGENT",
        age: p.age || "22",
        image: p.image,
      }));
      setPlayers(formatted);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "ALL" || p.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [players, searchTerm, filterRole]);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="max-w-7xl mx-auto px-6 py-10 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/40 p-4 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
          <div className="flex items-center gap-4 ml-2">
            <LayoutGrid className="text-green-500" size={20} />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">
              Sonsade
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Hero..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-green-500/50 transition-all text-sm font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative flex-1 md:w-48">
              <Filter
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <select
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-2.5 pl-11 pr-8 appearance-none focus:outline-none focus:border-green-500/50 transition-all text-sm font-bold cursor-pointer"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="ALL">All Roles</option>
                <option value="BATSMAN">Batsmen</option>
                <option value="BOWLER">Bowlers</option>
                <option value="ALL ROUNDER">All Rounders</option>
                <option value="WICKET KEEPER">Wicket Keepers</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PLAYER GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest">
              Loading Database...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredPlayers.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        )}

        {!loading && filteredPlayers.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
            <Award size={48} className="mx-auto text-slate-800 mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest">
              No Players Found
            </p>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center flex flex-col items-center gap-4">
        <div className="flex items-center gap-6 opacity-30">
          <div className="h-[1px] w-20 bg-white" />
          <Zap className="text-white" size={20} />
          <div className="h-[1px] w-20 bg-white" />
        </div>
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">
          © {new Date().getFullYear()} Sonasade Premier League • Official
          Database
        </p>
      </footer>
    </div>
  );
};

export default PlayerStatsPage;
