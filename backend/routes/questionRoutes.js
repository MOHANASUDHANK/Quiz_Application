import express from "express";
import { addQuestion, getQuestionByQuizId } from "../controllers/questionController.js";

const router = express.Router();

router.get("/:id",getQuestionByQuizId);
router.post("/add",addQuestion);

export default router;