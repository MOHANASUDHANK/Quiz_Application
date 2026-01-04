import express from "express";
import { attemptQuiz, getResultById, getResultByQuizId, getResultByUserId, submitResult } from "../controllers/resultController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/attempt",protect,attemptQuiz);
router.get("/:id",getResultById);
router.get("/quiz/:id",getResultByQuizId);
router.get("/user/:id",getResultByUserId);
router.post("/",submitResult);

export default router;