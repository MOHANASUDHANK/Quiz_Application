import express from "express";
import { getAllQuiz, addQuiz, getQuizById, deleteQuiz } from "../controllers/quizController.js";
import {protect,authorize} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/:id",getQuizById)
router.get("/",getAllQuiz);
router.post("/",protect,authorize("admin", "teacher"),addQuiz);
router.delete("/:id", protect, authorize("admin"), deleteQuiz);

export default router;