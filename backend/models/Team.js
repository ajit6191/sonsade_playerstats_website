import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    logo: {
      type: String, // Team logo Cloudinary URL
      default: "",
    },
    logo_public_id: {
      type: String,
      default: "",
    },

    captain: {
      type: String,
      required: true,
    },

    owner: {
      type: String,
      required: true,
    },

    // 🆕 Owner Image (URL)
    ownerImage: {
      type: String,
      default: "",
    },

    // 🆕 Owner Image Public ID
    ownerImage_public_id: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
