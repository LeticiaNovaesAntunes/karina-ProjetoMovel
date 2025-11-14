import { Router } from "express";
import {
  createClass,
  updateClass,
  deleteClass,
  getClasses,
  getClassById,
  getClassesByPart,
} from "../Controllers/ClassesController";

const router = Router();

router.post("/create", createClass);
router.put("/update/:id", updateClass);
router.delete("/delete/:id", deleteClass);
router.get("/classes", getClasses);
router.get("/:id", getClassById);
router.get("/part/:part", getClassesByPart);

export default router;
