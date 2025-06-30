import express from "express";
import {
  getTermsAndConditions,
  createTermsAndConditions,
  updateTermsAndConditions,
  deleteTermsAndConditions,
} from "../../controllers/terms-conditions/terms_conditions_controller.js";

const router = express.Router();

router.get("/", getTermsAndConditions);

router.post("/", createTermsAndConditions);

router.put("/:id", updateTermsAndConditions);

router.delete("/:id", deleteTermsAndConditions);

export default router;
