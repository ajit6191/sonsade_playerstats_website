import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    age: { type: Number },
    role: { type: String, required: true },
    image: { type: String, default: "" },

    // ⭐ Added Field
    jerseyNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;
