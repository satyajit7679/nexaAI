import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import { createConnection } from "mongoose";
import redis from "../../../shared/redis/redis.js";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../config/mail.js";

const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    if (!app) {
      return res
        .status(500)
        .json({ message: "Firebase auth is not configured on this server" });
    }

    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomUUID();
    await redis.set(
      `user-session-${user?._id}`,
      sessionId,
      "EX",
      7 * 24 * 60 * 60,
    );
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    res.cookie("session", sessionId, sessionCookieOptions);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};

export const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.emailVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    const sessionId = crypto.randomUUID();
    const sessionData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      plan: user.plan,
      credits: user.credits,
      totalCredits: user.totalCredits,
      planExpiresAt: user.planExpiresAt,
    };

    await redis.set(
      `user-session-${user._id}`,
      sessionId,
      "EX",
      7 * 24 * 60 * 60,
    );
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify(sessionData),
      "EX",
      7 * 24 * 60 * 60,
    );

    res.cookie("session", sessionId, sessionCookieOptions);

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `email login error ${error.message}` });
  }
};

export const logOut = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    await redis.del(`session-${sessionId}`);

    res.clearCookie("session");
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};

export const updateUserPayment = async (req, res) => {
  try {
    const { plan, credits, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.plan = plan;
    user.credits += credits;
    user.totalCredits += credits;
    user.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await user.save();

    const sessionId = await redis.get(`user-session-${user?._id}`);
    console.log("sessionId", sessionId);
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update user payment error ${error}` });
  }
};

export const deductCredits = async (req, res) => {
  try {
    const { userId, agent } = req.body;

    const COST = {
      chat: 1,

      search: 5,

      coding: 10,

      pdf: 10,

      ppt: 10,

      vision: 10,
    };

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const requiredCredits = COST[agent] || 1;
    if (user.credits < requiredCredits) {
      return res.status(400).json({ message: "Not enough credits." });
    }
    user.credits -= requiredCredits;
    await user.save();

    const sessionId = await redis.get(`user-session-${user?._id}`);
    console.log("sessionId", sessionId);
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    return res.status(200).json({ success: true, credits: user.credits });
  } catch (error) {
    return res.status(500).json({ message: `deduct credits error ${error}` });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    let user = await User.findOne({
      email: normalizedEmail,
    });

    // If user already exists and verified
    if (user && user.emailVerified) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Generate 6 digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    // OTP expires after 10 minutes
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      // Create new user

      user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        emailVerified: false,
        otp,
        otpExpiresAt,
      });
    } else {
      // User exists but hasn't verified email
      // Update registration data

      user.name = name;
      user.password = hashedPassword;
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;

      await user.save();
    }

    // Send OTP
    await sendOtpEmail(normalizedEmail, otp);

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email",
      email: normalizedEmail,
    });
  } catch (error) {
    console.log("register error:", error);

    return res.status(500).json({
      message: `register error ${error.message}`,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.emailVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `OTP verification error ${error.message}` });
  }
};
