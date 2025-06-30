import express from "express";
import {
  createRating,
  getAllRatings,
  getRatingsByCourse,
  deleteRating,
} from "../../controllers/rating/rating_controller.js";

const router = express.Router();

router.post("/", createRating);

router.get("/", getAllRatings);

router.get("/course/:courseId", getRatingsByCourse);

router.delete("/:id", deleteRating);

export default router;
