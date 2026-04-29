import express from "express";
import { attemptQuiz, getResultById, getResultByQuizId, getResultByUserId, submitResult } from "../controllers/resultController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/attempt",protect,attemptQuiz);
router.get("/:id",protect,getResultById);
router.get("/quiz/:id",protect,getResultByQuizId);
router.get("/user/:id",protect,getResultByUserId);
router.post("/",protect,submitResult);

export default router;