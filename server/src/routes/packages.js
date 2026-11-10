import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

const PACKAGE_FIELDS = ["name", "price", "popular", "features", "includes", "color", "priceValue"];

function pick(body) {
  const out = {};
  for (const key of PACKAGE_FIELDS) {
    if (body?.[key] !== undefined) out[key] = body[key];
  }
  return out;
}

router.get("/", (req, res) => {
  res.json({ data: db.load().packages });
});

router.post("/", (req, res) => {
  const data = db.load();
  if (!req.body?.name) return res.status(400).json({ message: "اسم الباقة مطلوب" });
  const pkg = {
    id: db.nextId("packages"),
    popular: false,
    color: "from-amber-500 to-orange-600",
    ...pick(req.body),
  };
  data.packages.push(pkg);
  db.save();
  res.status(201).json({ data: pkg, message: "تمت إضافة الباقة" });
});

router.put("/:id", (req, res) => {
  const data = db.load();
  const idx = data.packages.findIndex((p) => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "الباقة غير موجودة" });
  data.packages[idx] = { ...data.packages[idx], ...pick(req.body), id: data.packages[idx].id };
  db.save();
  res.json({ data: data.packages[idx], message: "تم تحديث الباقة" });
});

router.delete("/:id", (req, res) => {
  const data = db.load();
  const before = data.packages.length;
  data.packages = data.packages.filter((p) => p.id !== Number(req.params.id));
  if (data.packages.length === before) {
    return res.status(404).json({ message: "الباقة غير موجودة" });
  }
  db.save();
  res.json({ data: { success: true }, message: "تم حذف الباقة" });
});

export default router;
