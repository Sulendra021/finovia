const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// POST /api/auth/register
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) return res.status(409).json({ message: "An account with this email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        isVerified: false
      },
    });

    // Automatically generate initial OTP for new user verification
    await prisma.otpCode.deleteMany({ where: { email: normalizedEmail } });
    const initialOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.otpCode.create({
      data: {
        email: normalizedEmail,
        code: initialOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      }
    });

    // Dispatch SMTP Email with OTP
    await sendEmail({
      to: normalizedEmail,
      subject: "Finovia - Account Verification OTP",
      text: `Welcome to Finovia! Your OTP code for account verification is: ${initialOtp}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2>Welcome to Finovia!</h2>
          <p>Thank you for signing up. Use the OTP code below to verify your email address (<strong>${normalizedEmail}</strong>):</p>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #2563eb;">${initialOtp}</span>
          </div>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `
    });

    res.status(201).json({
      _id: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
      otp: initialOtp,
      message: `Account created successfully! An OTP code has been sent to ${normalizedEmail}.`
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      token: generateToken(user.id),
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me
async function getMe(req, res) {
  res.json(req.user);
}

// POST /api/auth/forgot-password
async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(404).json({
        message: `Account with ${normalizedEmail} does not exist. Please create a new account.`
      });
    }

    // Generate 6-digit OTP code for password recovery
    await prisma.otpCode.deleteMany({ where: { email: normalizedEmail } });
    const recoveryOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.otpCode.create({
      data: {
        email: normalizedEmail,
        code: recoveryOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      }
    });

    const crypto = require("crypto");
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000)
      }
    });

    // Dispatch SMTP Email with recovery OTP
    await sendEmail({
      to: normalizedEmail,
      subject: "Finovia - Password Reset OTP",
      text: `Your OTP code for password reset is: ${recoveryOtp}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password for <strong>${normalizedEmail}</strong>. Use the OTP code below:</p>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #2563eb;">${recoveryOtp}</span>
          </div>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    res.json({
      message: `An OTP code has been sent to ${normalizedEmail} for password recovery.`,
      otp: recoveryOtp,
      resetToken: rawToken
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/reset-password
async function resetPassword(req, res, next) {
  try {
    const { token, newPassword, email, otp } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    let targetUserId = null;

    if (email && otp) {
      const normalizedEmail = email.toLowerCase().trim();
      const otpRecord = await prisma.otpCode.findFirst({
        where: { email: normalizedEmail, code: otp.trim() }
      });
      if (!otpRecord || otpRecord.expiresAt < new Date()) {
        return res.status(400).json({ message: "Invalid or expired OTP code for password reset" });
      }
      const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      if (!user) return res.status(400).json({ message: "User account not found" });
      targetUserId = user.id;
      await prisma.otpCode.delete({ where: { id: otpRecord.id } });
    } else if (token) {
      const crypto = require("crypto");
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
      const resetTokenRecord = await prisma.passwordResetToken.findUnique({
        where: { token: hashedToken },
        include: { user: true }
      });

      if (!resetTokenRecord || resetTokenRecord.expiresAt < new Date()) {
        if (resetTokenRecord) await prisma.passwordResetToken.delete({ where: { id: resetTokenRecord.id } });
        return res.status(400).json({ message: "Invalid or expired password reset token" });
      }

      targetUserId = resetTokenRecord.userId;
      await prisma.passwordResetToken.delete({ where: { id: resetTokenRecord.id } });
    } else {
      return res.status(400).json({ message: "Either OTP or reset token is required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: targetUserId },
      data: { password: hashedPassword, isVerified: true }
    });

    res.json({ message: "Password reset successful! You can now log in with your new password." });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/send-otp
async function sendOtp(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    await prisma.otpCode.deleteMany({
      where: { email: normalizedEmail }
    });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpCode.create({
      data: {
        email: normalizedEmail,
        code: otpCode,
        expiresAt
      }
    });

    await sendEmail({
      to: normalizedEmail,
      subject: "Finovia - One Time Password (OTP)",
      text: `Your OTP code is: ${otpCode}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2>Your One-Time Password</h2>
          <p>Use the OTP code below to complete your verification for <strong>${normalizedEmail}</strong>:</p>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #2563eb;">${otpCode}</span>
          </div>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `
    });

    res.json({
      message: `A 6-digit OTP code has been sent to ${normalizedEmail}.`,
      otp: otpCode
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/verify-otp
async function verifyOtp(req, res, next) {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: "Email and OTP code are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        email: normalizedEmail,
        code: code.trim()
      }
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      if (otpRecord) {
        await prisma.otpCode.delete({ where: { id: otpRecord.id } });
      }
      return res.status(400).json({ message: "Invalid or expired OTP code" });
    }

    await prisma.otpCode.delete({ where: { id: otpRecord.id } });

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true }
      });
    }

    res.json({
      message: "Email verified successfully!",
      verified: true
    });
  } catch (err) {
    next(err);
  }
}

// PUT /api/auth/change-password
async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, getMe, forgotPassword, resetPassword, sendOtp, verifyOtp, changePassword };

