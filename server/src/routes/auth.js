import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { JWT_SECRET, signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const data = db.load();
  const user = data.users.find((u) => u.email === String(email || "").toLowerCase());
  if (!user || !bcrypt.compareSync(password || "", user.password)) {
    return res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
  }
  const token = signToken(user);
  res.json({ data: { token, name: user.name, email: user.email, role: user.role } });
});

router.get("/verify", requireAuth, (req, res) => {
  res.json({ data: { name: req.user.name, email: req.user.email, role: req.user.role } });
});

router.post("/send-otp", (req, res) => {
  const { phoneNumber } = req.body || {};
  if (!phoneNumber) return res.status(400).json({ message: "رقم الجوال مطلوب" });
  // TODO: connect a real SMS gateway here
  res.json({ data: { success: true, message: "تم إرسال رمز التحقق" } });
});

router.post("/verify-otp", (req, res) => {
  const { phoneNumber, otpCode } = req.body || {};
  if (!phoneNumber || !otpCode) return res.status(400).json({ message: "رقم الجوال ورمز التحقق مطلوبان" });
  // TODO: validate against the OTP store created in send-otp
  res.json({ data: { success: true } });
});

router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body || {};
  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    const data = db.load();
    const user = data.users.find((u) => u.id === payload.id);
    if (!user) return res.status(401).json({ message: "المستخدم غير موجود" });
    res.json({ data: { token: signToken(user) } });
  } catch {
    return res.status(401).json({ message: "توكن غير صالح" });
  }
});

export default router;
