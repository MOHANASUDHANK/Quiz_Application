import express from "express";
import { addQuestion, getQuestionByQuizId } from "../controllers/questionController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id",getQuestionByQuizId);
router.post("/add", protect, authorize("admin", "teacher"), addQuestion);

export default router;