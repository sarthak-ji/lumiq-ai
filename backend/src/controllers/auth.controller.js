import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

// ===================== Register Controller ========================
/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body {username, email, password, confirmPassword}
 */
export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message:
          "User already exists with the provided email or username. Please try again with different credentials.",
        success: false,
        err: "User already exists",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const emailVerificationToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome to Lumiq AI!",
        html: `
      <h1>Hi ${user.username},</h1>
        <p>Thank you for registering at <strong>Lumiq AI</strong>. We're excited to have you on board!</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="http://localhost:8000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br/>The Lumiq AI Team</p>
    `,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Failed to send verification email. Please try again.",
        success: false,
        err: err.message,
      });
    }

    return res.status(201).json({
      message: "User registered successfully.",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to register user. Please try again.",
      success: false,
      err: err.message,
    });
  }
}

// ===================== Re-send email verification Controller ========================
/*
 * @description Re-send email verification link to user
 * @route POST /api/auth/resend-verification-email
 * @access Public
 * @body {email}
 */
export async function resendVerificationEmail(req, res) {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        err: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email is already verified.",
        success: false,
      });
    }

    const emailVerificationToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    await sendEmail({
      to: user.email,
      subject: "Lumiq AI - Email Verification",
      html: `
        <h1>Hi ${user.username},</h1>
        <p>You requested to resend the email verification link. Please click the link below to verify your email address:</p>
        <a href="http://localhost:8000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br/>The Lumiq AI Team</p>
        `,
    });

    return res.status(200).json({
      message:
        "Verification email resent successfully. Please check your inbox.",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to resend verification email. Please try again.",
      success: false,
      err: err.message,
    });
  }
}

// ===================== Login Controller ========================
/**
 * @description Login an existing user
 * @route POST /api/auth/login
 * @access Public
 * @body {email, password}
 */

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
      err: "User not found",
    });
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
      err: "Incorrect password",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email before logging in.",
      success: false,
      err: "Email not verified",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

// ===================== Get-Me Controller ========================
/**
 * @description Get current logged-in user's details
 * @route GET /api/auth/get-me
 * @access Private
 */
export async function getMe(req, res) {
  const user = await userModel.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      err: "User not found",
    });
  }
  res.status(200).json({
    message: "User details fetched successfully",
    success: true,
    user,
  });
}

// ===================== Verify-Email Controller ========================
/**
 * @description Verify user's email address
 * @route POST /api/auth/verify-email
 * @access Public
 * @body {token}
 */
export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({
        message: "Invalid token or user does not exist",
        success: false,
        err: "User not found",
      });
    }

    if (user.verified) {
      return res.send(`
    <h1>Email Already Verified</h1>
    <p>You can login directly.</p>
    <a href="http://localhost:8000/login">Go to Login</a>
  `);
    }

    user.verified = true;

    await user.save();

    const html = `
    <h1>Email Verified Successfully!</h1>
    <p>Your email has been verified. You can now login to your account.</p>
    <a href="http://localhost:8000/login">Go to Login</a>
    `;

    return res.send(html);
    
  } catch (err) {
    return res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}
