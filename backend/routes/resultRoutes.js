import express from "express";
import { getResultByQuizId, getResultByUserId, submitResult } from "../controllers/resultController.js";

const router = express.Router();

router.get("/user/:id",getResultByQuizId);
router.get("/quiz/:id",getResultByUserId);
router.post("/",submitResult);

export default router;