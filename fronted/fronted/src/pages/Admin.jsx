import axios from "axios";
import {
  CheckCircle2,
  Image as ImageIcon,
  LayoutGrid,
  PlusCircle,
  ShieldPlus,
  Upload,
  User,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Admin() {
  /* --- STATE MANAGEMENT --- */
  const [formData, setFormData] = useState({
    name: "",
    captain: "",
    owner: "",
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [ownerImage, setOwnerImage] = useState(null);
  const [ownerPreview, setOwnerPreview] = useState("");

  const [playerData, setPlayerData] = useState({
    name: "",
    age: "",
    role: "",
    team: "",
    jerseyNumber: "",
  });
  const [playerImage, setPlayerImage] = useState(null);
  const [playerPreview, setPlayerPreview] = useState("");

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:8000/teams/getallteams");
      setTeams(res.data.teams);
    } catch (err) {
      toast.error("Failed to fetch teams");
    }
  };

  /* --- HANDLERS --- */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePlayerChange = (e) =>
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* --- SUBMISSION LOGIC --- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logo || !ownerImage)
      return toast.error("Upload both Team Logo and Owner Image");

    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
      fd.append("logo", logo);
      fd.append("ownerImage", ownerImage);

      await axios.post("http://localhost:8000/teams/add", fd);
      toast.success("Team Registered Successfully!");

      // Reset
      setFormData({ name: "", captain: "", owner: "" });
      setLogo(null);
      setOwnerImage(null);
      setLogoPreview("");
      setOwnerPreview("");
      fetchTeams();
    } catch (err) {
      toast.error("Error adding team");
    }
  };

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    if (!playerImage) return toast.error("Please upload player image");

    try {
      const fd = new FormData();
      Object.keys(playerData).forEach((key) => fd.append(key, playerData[key]));
      fd.append("image", playerImage);

      await axios.post("http://localhost:8000/teams/addplayer", fd);
      toast.success("Player Enrolled Successfully!");

      setPlayerData({
        name: "",
        age: "",
        role: "",
        team: "",
        jerseyNumber: "",
      });
      setPlayerImage(null);
      setPlayerPreview("");
    } catch (err) {
      toast.error("Error adding player");
    }
  };

  /* --- UI CONSTANTS --- */
  const inputClass =
    "w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all shadow-inner";
  const labelClass =
    "text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block ml-1";

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4">
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8 pt-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase">
            Admin <span className="text-green-500 italic">Control</span>
          </h1>
          <p className="text-slate-500 font-medium">
            League Management Dashboard
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-2xl text-green-400 text-sm font-bold">
          <CheckCircle2 size={18} /> System Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TEAM REGISTRATION */}
        <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex items-center gap-4 bg-gradient-to-r from-blue-600/10 to-transparent">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <ShieldPlus size={24} />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Register Team
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Team Name</label>
                <input
                  type="text"
                  name="name"
                  className={inputClass}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Captain</label>
                  <input
                    type="text"
                    name="captain"
                    className={inputClass}
                    value={formData.captain}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Owner</label>
                  <input
                    type="text"
                    name="owner"
                    className={inputClass}
                    value={formData.owner}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className={labelClass}>Team Logo</label>
                <div className="h-32 rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center hover:border-blue-500/40 transition-all relative overflow-hidden bg-black/20">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload size={20} className="text-slate-600" />
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      handleFileChange(e, setLogo, setLogoPreview)
                    }
                  />
                </div>
              </div>
              <div className="relative">
                <label className={labelClass}>Owner Photo</label>
                <div className="h-32 rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center hover:border-blue-500/40 transition-all relative overflow-hidden bg-black/20">
                  {ownerPreview ? (
                    <img
                      src={ownerPreview}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-slate-600" />
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      handleFileChange(e, setOwnerImage, setOwnerPreview)
                    }
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} /> CREATE FRANCHISE
            </button>
          </form>
        </section>

        {/* PLAYER REGISTRATION */}
        <section className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex items-center gap-4 bg-gradient-to-r from-orange-600/10 to-transparent">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <UserPlus size={24} />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Add Player
            </h2>
          </div>

          <form onSubmit={handlePlayerSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelClass}>Player Name</label>
                <input
                  type="text"
                  name="name"
                  className={inputClass}
                  value={playerData.name}
                  onChange={handlePlayerChange}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Jersey #</label>
                <input
                  type="number"
                  name="jerseyNumber"
                  className={inputClass}
                  value={playerData.jerseyNumber}
                  onChange={handlePlayerChange}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Role #</label>
                <select
                  name="role"
                  className={inputClass}
                  value={playerData.role}
                  onChange={handlePlayerChange}
                  required
                >
                  <option value="">All Roles</option>
                  <option value="Batsmen">Batsmen</option>
                  <option value="Bowlers">Bowlers</option>
                  <option value="All Rounders">All Rounders</option>
                  <option value="Wicket Keepers">Wicket Keepers</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Age</label>
                <input
                  type="number"
                  name="age"
                  className={inputClass}
                  value={playerData.age}
                  onChange={handlePlayerChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Team Assignment</label>
                <select
                  name="team"
                  className={inputClass}
                  value={playerData.team}
                  onChange={handlePlayerChange}
                  required
                >
                  <option value="">Select Team</option>
                  {teams.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Profile Picture</label>
              <div className="h-40 rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center hover:border-orange-500/40 transition-all relative overflow-hidden bg-black/20">
                {playerPreview ? (
                  <img
                    src={playerPreview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={30} className="text-slate-600" />
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) =>
                    handleFileChange(e, setPlayerImage, setPlayerPreview)
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-600/20 transition-all"
            >
              ENROLL PLAYER
            </button>
          </form>
        </section>
      </div>

      {/* TEAM OVERVIEW LIST */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <LayoutGrid className="text-green-500" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            Current Teams
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] hover:bg-slate-800/60 transition-all text-center"
            >
              <img
                src={team.logo}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-green-500/20 p-1 object-cover"
              />
              <h3 className="font-black text-white mb-2">{team.name}</h3>
              <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest space-y-1">
                <p>
                  Capt: <span className="text-slate-300">{team.captain}</span>
                </p>
                <p>
                  Owner: <span className="text-slate-300">{team.owner}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
