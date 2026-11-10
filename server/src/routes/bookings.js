import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

const BOOKING_FIELDS = [
  "customerName", "customerPhone", "city", "eventDate", "duration",
  "guests", "totalPrice", "status", "details", "extras",
];

const VALID_STATUS = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

function pick(body) {
  const out = {};
  for (const key of BOOKING_FIELDS) {
    if (body?.[key] !== undefined) out[key] = body[key];
  }
  return out;
}

router.get("/", (req, res) => {
  const data = db.load();
  const list = [...data.bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ data: list });
});

router.get("/:id", (req, res) => {
  const data = db.load();
  const item = data.bookings.find((b) => b.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: "الحجز غير موجود" });
  res.json({ data: item });
});

router.post("/", (req, res) => {
  const data = db.load();
  if (!req.body?.customerName) return res.status(400).json({ message: "اسم العميل مطلوب" });
  const booking = {
    id: db.nextId("bookings"),
    status: "PENDING",
    createdAt: new Date().toISOString(),
    ...pick(req.body),
  };
  data.bookings.push(booking);
  db.save();
  res.status(201).json({ data: booking, message: "تم إنشاء الحجز" });
});

router.put("/:id/status", (req, res) => {
  const data = db.load();
  const idx = data.bookings.findIndex((b) => b.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "الحجز غير موجود" });
  const status = req.body?.status;
  if (!VALID_STATUS.includes(status)) {
    return res.status(400).json({ message: `الحالة غير صالحة. القيم المتاحة: ${VALID_STATUS.join("، ")}` });
  }
  data.bookings[idx].status = status;
  db.save();
  res.json({ data: data.bookings[idx], message: "تم تحديث حالة الحجز" });
});

router.delete("/:id", (req, res) => {
  const data = db.load();
  const before = data.bookings.length;
  data.bookings = data.bookings.filter((b) => b.id !== Number(req.params.id));
  if (data.bookings.length === before) {
    return res.status(404).json({ message: "الحجز غير موجود" });
  }
  db.save();
  res.json({ data: { success: true }, message: "تم حذف الحجز" });
});

export default router;
