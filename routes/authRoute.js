import express from "express";
import { registerCandidate, loginCandidate } from "../controllers/candidateController.js";

const router = express.Router();

//AUTH Routes
router.post("/register", registerCandidate);
router.post("/login", loginCandidate);

export default router;