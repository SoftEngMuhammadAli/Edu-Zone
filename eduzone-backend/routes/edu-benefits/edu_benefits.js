const express = require("express");
const router = express.Router();
const {
  handleBenefitByGetAll,
  handleBenefitById,
  createBenefit,
  handleUpdateBenefitById,
  handleDeleteBenefitById,
} = require("../../controllers/edu-benefits/edu_benefits_controller");

router.get("/all", handleBenefitByGetAll);
router.get("/:id", handleBenefitById);

router.post("/create", createBenefit);

router.put("/:id", handleUpdateBenefitById);

router.delete("/:id", handleDeleteBenefitById);

module.exports = router;
