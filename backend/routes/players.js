import express from "express";
import Player from "../models/Player.js";

const router = express.Router();

// GET all players with team info
router.get("/", async (req, res) => {
  try {
    const players = await Player.find().populate("team", "name");
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new player (with Cloudinary image URL)
router.post("/", async (req, res) => {
  try {
    const newPlayer = new Player(req.body); // req.body.image मध्ये Cloudinary URL द्या
    const savedPlayer = await newPlayer.save();
    res.json(savedPlayer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
