import express from "express";
import {
  adminLogin,
  getAdminMe,
  logout,
} from "../controllers/userController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", logout);
router.get("/me", adminAuth, getAdminMe);

export default router;
