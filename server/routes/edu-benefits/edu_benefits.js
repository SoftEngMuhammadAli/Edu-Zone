import express from "express";
const router = express.Router();
import {
  handleBenefitByGetAll,
  handleBenefitById,
  createBenefit,
  handleUpdateBenefitById,
  handleDeleteBenefitById,
} from "../../controllers/edu-benefits/edu_benefits_controller.js";

router.get("/all", handleBenefitByGetAll);
router.get("/:id", handleBenefitById);

router.post("/create", createBenefit);

router.put("/:id", handleUpdateBenefitById);

router.delete("/:id", handleDeleteBenefitById);

export default router;
