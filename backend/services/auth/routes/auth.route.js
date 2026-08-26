import express from "express";

import {
  deductCredits,
  login,
  emailLogin,
  logOut,
  updateUserPayment,
  register,
  verifyOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Existing Firebase login
router.post("/login", login);
router.post("/email-login", emailLogin);

// New email/password registration
router.post("/register", register);
router.post("/verify-otp", verifyOtp);

// Existing routes
router.get("/logout", logOut);

router.post("/update-plan", updateUserPayment);

router.post("/deduct-credits", deductCredits);

export default router;
