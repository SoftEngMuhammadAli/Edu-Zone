import express from "express";
const router = express.Router();
import checkAuth from "../../middlewares/auth/auth_middleware.js";
import authorizeRoles from "../../middlewares/auth/authorization_middleware.js";
import {
  getPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} from "../../controllers/privacy-policy/privacy_policy_controller.js";

router.get("/", checkAuth, getPrivacyPolicy);

router.post("/", checkAuth, authorizeRoles("admin"), createPrivacyPolicy);

router.put("/:id", checkAuth, authorizeRoles("admin"), updatePrivacyPolicy);

router.delete("/:id", checkAuth, authorizeRoles("admin"), deletePrivacyPolicy);

export default router;
