import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import playerRoutes from "./routes/players.js";
import teamRoutes from "./routes/teams.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ⭐ FIX for req.body

app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);

app.get("/", (req, res) => {
  res.send("SPL API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
