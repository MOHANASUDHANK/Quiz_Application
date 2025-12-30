import express from "express";
import { addUser, getUserById } from "../controllers/userControoller.js";


const router = express.Router();

router.post("/",addUser);
router.get("/:id",getUserById);

export default router;