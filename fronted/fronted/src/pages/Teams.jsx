import axios from "axios";
import { Crown, LayoutGrid, UserCircle, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

// --- SUB-COMPONENT: ELITE TEAM CARD ---
// Designed to match the high-end broadcast style of the player cards
const TeamCard = ({ team }) => {
  return (
    <div className="group relative w-full aspect-[0.75] transition-all duration-500 hover:-translate-y-3">
      {/* 1. OUTER GLOW & METALLIC BORDER */}
      <div className="absolute -inset-[1.5px] bg-gradient-to-br from-yellow-400/40 via-yellow-500/10 to-transparent rounded-2xl transition-all group-hover:via-yellow-400/60" />

      {/* 2. MAIN CARD CONTAINER */}
      <div className="relative h-full w-full bg-[#0d1117] rounded-[20px] overflow-hidden shadow-2xl flex flex-col border border-white/5">
        {/* Background Geometric Detail */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-transparent"
            style={{ clipPath: "polygon(100% 0, 0 0, 0 45%, 100% 65%)" }}
          />
        </div>

        {/* 3. TOP BADGE & FRANCHISE TAG */}
        <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center">
          <div className="w-14 h-14 rounded-full border-2 border-yellow-500 p-1 bg-black shadow-[0_0_15px_rgba(234,179,8,0.3)] overflow-hidden">
            <img
              src={team.logo}
              alt="team-logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg">
            <span className="text-[9px] font-black text-yellow-500 tracking-widest uppercase">
              BLUE
            </span>
          </div>
        </div>

        {/* 4. OWNER IMAGE SECTION (Blended) */}
        <div className="relative flex-1 flex items-end justify-center overflow-hidden pt-10">
          {team.ownerImage || team.logo ? (
            <img
              src={team.ownerImage || team.logo}
              alt={team.owner}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <UserCircle size={140} className="text-slate-800 mb-10" />
          )}

          {/* Bottom Fade - Blends the image into the card background */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent z-10" />
        </div>

        {/* 5. SKEWED TEAM NAMEPLATE */}
        <div className="absolute bottom-[72px] left-0 right-0 z-20 px-4">
          <div className="inline-block transform -skew-x-12 bg-yellow-500 px-6 py-2 shadow-[10px_10px_30px_rgba(0,0,0,0.6)] border-r-4 border-black/20">
            <h3 className="transform skew-x-12 text-lg font-black uppercase text-black leading-none tracking-tight">
              {team.name}
            </h3>
          </div>
        </div>

        {/* 6. BOTTOM STAT STRIP */}
        <div className="relative z-30 bg-[#161b22] border-t border-white/10 p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Crown size={10} className="text-yellow-500" /> Owner
            </span>
            <span className="text-sm font-black text-white truncate max-w-[120px]">
              {team.owner}
            </span>
          </div>

          <div className="flex gap-4 border-l border-white/10 pl-4">
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">
                Captain
              </span>
              <span className="text-sm font-black text-yellow-500 italic">
                {team.captain?.toUpperCase() || "TBA"}
              </span>
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
export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/teams/getallteams");
      setTeams(res.data.teams);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* 2. TEAMS GRID */}
      <main className="relative z-10 max-w-7xl mx-auto py-10 px-6 pb-32">
        <div className="flex items-center gap-3 mb-10 opacity-70">
          <LayoutGrid className="text-yellow-500" size={18} />
          <h3 className="text-xs font-black uppercase tracking-widest">
            Franchise Directory
          </h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-40">
            <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest">
              Fetching Team Data...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 place-items-center">
            {teams.map((team) => (
              <TeamCard key={team._id} team={team} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && teams.length === 0 && (
          <div className="text-center py-24 border border-dashed border-white/5 rounded-[3rem] bg-slate-900/10">
            <Users size={48} className="mx-auto text-slate-800 mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest">
              No teams registered yet.
            </p>
          </div>
        )}
      </main>

      {/* 3. PROFESSIONAL FOOTER */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Zap size={14} className="text-yellow-500" /> Real-time Auction Sync
        </div>
        <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em]">
          Sonasade Premier League • Official Portal
        </p>
      </footer>
    </div>
  );
}
