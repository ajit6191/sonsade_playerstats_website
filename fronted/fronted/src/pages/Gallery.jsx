import { Camera, Maximize2, Zap } from "lucide-react";
import { useState } from "react";

// --- STATIC DATA: MOMENTS FROM THE FIELD ---
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Opening Ceremony",
    category: "Events",
    size: "large",
    url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "The Winning Shot",
    category: "Matches",
    size: "small",
    url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "Owner's Meet",
    category: "Franchise",
    size: "small",
    url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    title: "Final Over Drama",
    category: "Matches",
    size: "tall",
    url: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    title: "Local Fans",
    category: "Events",
    size: "small",
    url: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    title: "Trophy Reveal",
    category: "Awards",
    size: "wide",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
  },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredItems =
    activeFilter === "ALL"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(
          (item) => item.category.toUpperCase() === activeFilter
        );

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500 selection:text-black">
      {/* 1. BRANDED HEADER */}
      <header className="relative pt-24 pb-16 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-yellow-500/5 blur-[160px] rounded-full pointer-events-none opacity-50" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            <Camera size={14} className="text-yellow-500" /> Moments of Glory
          </div>

          <div className="space-y-0">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
              सोनसडे
            </h1>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 italic">
              gallery
            </h2>
          </div>
        </div>
      </header>

      {/* 2. FILTER TABS */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap justify-center gap-4">
        {["ALL", "MATCHES", "EVENTS", "FRANCHISE", "AWARDS"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] transition-all border ${
              activeFilter === cat
                ? "bg-yellow-500 border-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                : "bg-white/5 border-white/10 text-slate-400 hover:border-yellow-500/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. BENTO GRID GALLERY */}
      <main className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 hover:border-yellow-500/40 ${
                item.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : item.size === "wide"
                  ? "md:col-span-2 md:row-span-1"
                  : item.size === "tall"
                  ? "md:col-span-1 md:row-span-2"
                  : ""
              }`}
            >
              {/* IMAGE */}
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* ACTION ICON */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                <div className="bg-yellow-500 p-2 rounded-lg text-black shadow-xl">
                  <Maximize2 size={16} />
                </div>
              </div>

              {/* CAPTION (The Skewed Look) */}
              <div className="absolute bottom-4 left-4 z-20">
                <div className="inline-block transform -skew-x-12 bg-yellow-500 px-3 py-1 shadow-2xl">
                  <p className="transform skew-x-12 text-[10px] font-black uppercase text-black leading-none">
                    {item.category}
                  </p>
                </div>
                <h3 className="text-white font-black uppercase text-sm mt-2 tracking-tight drop-shadow-lg">
                  {item.title}
                </h3>
              </div>

              {/* HOLOGRAPHIC SHINE */}
              <div
                className="absolute inset-0 z-40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                }}
              />
            </div>
          ))}
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <Zap size={14} className="text-yellow-500 fill-yellow-500" />{" "}
          High-Resolution Archive
        </div>
        <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.6em]">
          Sonasade Premier League • Official Media Portal
        </p>
      </footer>
    </div>
  );
};

export default Gallery;
