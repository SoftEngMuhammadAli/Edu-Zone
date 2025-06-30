import express from "express";
const router = express.Router();
import {
  getTermsAndConditions,
  createTermsAndConditions,
  updateTermsAndConditions,
  deleteTermsAndConditions,
} from "../../controllers/terms-conditions/terms_conditions_controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";

router.get("/", checkAuth, getTermsAndConditions);

router.post("/", checkAuth, authorizeRoles("admin"), createTermsAndConditions);

router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin"),
  updateTermsAndConditions
);

router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin"),
  deleteTermsAndConditions
);

export default router;
