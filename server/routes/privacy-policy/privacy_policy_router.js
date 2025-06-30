import express from "express";
const router = express.Router();
import {
  getPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} from "../../controllers/privacy-policy/privacy_policy_controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";

router.get("/", checkAuth, getPrivacyPolicy);

router.post("/", checkAuth, authorizeRoles("admin"), createPrivacyPolicy);

router.put("/:id", checkAuth, authorizeRoles("admin"), updatePrivacyPolicy);

router.delete("/:id", checkAuth, authorizeRoles("admin"), deletePrivacyPolicy);

export default router;
