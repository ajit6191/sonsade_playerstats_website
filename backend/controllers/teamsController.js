import Player from "../models/Player.js";
import Team from "../models/Team.js";

// =========================
//   ADD TEAM CONTROLLER
// =========================
export const addTeam = async (req, res) => {
  try {
    const { name, captain, owner } = req.body;

    // Validate required fields
    if (!name || !captain || !owner) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate file uploads
    if (!req.files || !req.files.logo || !req.files.ownerImage) {
      return res
        .status(400)
        .json({ message: "Team logo and owner image are required" });
    }

    // Team Logo
    const logoFile = req.files.logo[0];
    const logoUrl = logoFile.path;
    const logoPublicId = logoFile.filename;

    // Owner Image
    const ownerImageFile = req.files.ownerImage[0];
    const ownerImageUrl = ownerImageFile.path;
    const ownerImagePublicId = ownerImageFile.filename;

    // Save team in DB
    const newTeam = new Team({
      name,
      captain,
      owner,
      logo: logoUrl,
      logo_public_id: logoPublicId,
      ownerImage: ownerImageUrl,
      ownerImage_public_id: ownerImagePublicId,
    });

    await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team added successfully",
      team: newTeam,
    });
  } catch (error) {
    console.log("Add team error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    console.log("Fetch teams error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================================================
//                ADD PLAYER CONTROLLER
// ==================================================
export const addPlayer = async (req, res) => {
  try {
    const { name, age, role, team, jerseyNumber } = req.body;

    // Validate required fields
    if (!name || !role || !team || !jerseyNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate team ID exists
    const teamExists = await Team.findById(team);
    if (!teamExists) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Validate jerseyNumber is number
    if (isNaN(jerseyNumber)) {
      return res
        .status(400)
        .json({ message: "Jersey number must be a number" });
    }

    // Validate image
    if (!req.file) {
      return res.status(400).json({ message: "Player image is required" });
    }

    const imageUrl = req.file.path; // Cloudinary URL
    const publicId = req.file.filename; // Cloudinary public ID

    const newPlayer = new Player({
      name,
      age,
      role,
      team,
      jerseyNumber,
      image: imageUrl,
      image_public_id: publicId, // save in DB if needed
    });

    await newPlayer.save();

    res.status(201).json({
      success: true,
      message: "Player added successfully",
      player: newPlayer,
    });
  } catch (error) {
    console.log("Add Player Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find()
      .populate("team", "name logo captain owner") // populate only needed fields
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      count: players.length,
      players,
    });
  } catch (error) {
    console.log("Get All Players Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching players",
    });
  }
};
