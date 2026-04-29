import express from "express";
import { register, login, addStaff } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add-staff", protect, authorize("admin"), addStaff);

export default router;
