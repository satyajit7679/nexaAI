import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Existing Firebase field
    firebaseUid: {
      type: String,
    },

    name: String,

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    avatar: String,

    // New: password for email/password login
    password: {
      type: String,
    },

    // New: email verification
    emailVerified: {
      type: Boolean,
      default: false,
    },

    // New: OTP
    otp: {
      type: String,
    },

    // New: OTP expiration
    otpExpiresAt: {
      type: Date,
    },

    plan: {
      type: String,
      default: "free",
    },

    credits: {
      type: Number,
      default: 100,
    },

    totalCredits: {
      type: Number,
      default: 100,
    },

    planExpiresAt: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  { firebaseUid: 1 },
  {
    name: "firebaseUid_1",
    unique: true,
    partialFilterExpression: { firebaseUid: { $type: "string" } },
  },
);

const User = mongoose.model("User", userSchema);

export default User;
