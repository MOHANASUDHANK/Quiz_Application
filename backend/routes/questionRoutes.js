import express from "express";
import { addQuestion, getQuestionByQuizId } from "../controllers/questionController.js";

const router = express.Router();

router.get("/:id",getQuestionByQuizId);
router.post("/",addQuestion);

export default router;