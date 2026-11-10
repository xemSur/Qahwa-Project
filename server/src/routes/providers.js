import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

const PROVIDER_FIELDS = [
  "name", "gender", "city", "rating", "reviews", "experience",
  "specialties", "pricePerHour", "verified", "available", "image",
];

function pick(body) {
  const out = {};
  for (const key of PROVIDER_FIELDS) {
    if (body?.[key] !== undefined) out[key] = body[key];
  }
  return out;
}

router.get("/", (req, res) => {
  const data = db.load();
  let list = data.providers;
  if (req.query.city && req.query.city !== "الكل") {
    list = list.filter((p) => p.city === req.query.city);
  }
  if (req.query.gender && req.query.gender !== "الكل") {
    list = list.filter((p) => p.gender === req.query.gender);
  }
  res.json({ data: list });
});

router.get("/:id", (req, res) => {
  const data = db.load();
  const item = data.providers.find((p) => p.id === Number(req.params.id));
  if (!item) return res.status(404).json({ message: "مقدم الخدمة غير موجود" });
  res.json({ data: item });
});

router.post("/", (req, res) => {
  const data = db.load();
  const provider = {
    id: db.nextId("providers"),
    gender: "قهوجي",
    city: "الرياض",
    rating: 0,
    reviews: 0,
    verified: false,
    available: true,
    ...pick(req.body),
  };
  if (!provider.name) return res.status(400).json({ message: "اسم مقدم الخدمة مطلوب" });
  data.providers.push(provider);
  db.save();
  res.status(201).json({ data: provider, message: "تمت الإضافة بنجاح" });
});

router.put("/:id", (req, res) => {
  const data = db.load();
  const idx = data.providers.findIndex((p) => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "مقدم الخدمة غير موجود" });
  data.providers[idx] = { ...data.providers[idx], ...pick(req.body), id: data.providers[idx].id };
  db.save();
  res.json({ data: data.providers[idx], message: "تم التحديث بنجاح" });
});

router.delete("/:id", (req, res) => {
  const data = db.load();
  const before = data.providers.length;
  data.providers = data.providers.filter((p) => p.id !== Number(req.params.id));
  if (data.providers.length === before) {
    return res.status(404).json({ message: "مقدم الخدمة غير موجود" });
  }
  db.save();
  res.json({ data: { success: true }, message: "تم الحذف بنجاح" });
});

export default router;
