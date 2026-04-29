import express from "express";
import { addUser, getUserById, getStaff, deleteUser } from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/staff", protect, authorize("admin"), getStaff);
router.post("/",addUser);
router.get("/:id",getUserById);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;