import express from "express";
import { getAllQuiz,addQuiz, getQuizById } from "../controllers/quizController.js";
import {protect,authorize} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/:id",getQuizById)
router.get("/",getAllQuiz);
router.post("/",protect,authorize("admin"),addQuiz);


export default router;