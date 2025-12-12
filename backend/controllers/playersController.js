import Player from "../models/Player.js";

// GET all players
export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("team");
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new player
export const createPlayer = async (req, res) => {
  const { name, team, age, role } = req.body;

  const player = new Player({
    name,
    team,
    age,
    role
  });

  try {
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
