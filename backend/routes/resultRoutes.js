import express from "express";
import { attemptQuiz, getResultById, getResultByQuizId, getResultByUserId, submitResult } from "../controllers/resultController.js";

const router = express.Router();

router.post("/:id/attempt",attemptQuiz);
router.get("/:id",getResultById);
router.get("/quiz/:id",getResultByQuizId);
router.get("/user/:id",getResultByUserId);
router.post("/",submitResult);

export default router;