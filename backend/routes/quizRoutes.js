import express from "express";
import { getAllQuiz,addQuiz, getQuizById } from "../controllers/quizController.js";

const router = express.Router();

router.get("/:id",getQuizById)
router.get("/",getAllQuiz);
router.post("/",addQuiz);


export default router;