import express from "express";
import upload from "../config/multer.js";
import {
  addPlayer,
  addTeam,
  getAllPlayers,
  getAllTeams,
} from "../controllers/teamsController.js";

const router = express.Router();

// Routes
router.get("/getallteams", getAllTeams);
router.post(
  "/add",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "ownerImage", maxCount: 1 },
  ]),
  addTeam
);

router.post("/addplayer", upload.single("image"), addPlayer);
router.get("/getallplayers", getAllPlayers);

export default router;
