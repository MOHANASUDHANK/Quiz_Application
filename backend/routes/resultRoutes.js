import express from "express";
import { attemptQuiz, getResultByQuizId, getResultByUserId, submitResult } from "../controllers/resultController.js";

const router = express.Router();

router.get("/quiz/:id",getResultByQuizId);
router.get("/user/:id",getResultByUserId);
router.post("/:id/attempt",attemptQuiz);
router.post("/",submitResult);

export default router;