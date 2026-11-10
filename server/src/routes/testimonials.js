import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", (req, res) => {
  res.json({ data: db.load().testimonials });
});

router.post("/", (req, res) => {
  const data = db.load();
  const { n, c, t } = req.body || {};
  if (!n || !t) return res.status(400).json({ message: "الاسم والنص مطلوبان" });
  const item = { id: db.nextId("testimonials"), n, c: c || "", t };
  data.testimonials.push(item);
  db.save();
  res.status(201).json({ data: item, message: "تمت إضافة التقييم" });
});

router.delete("/:id", (req, res) => {
  const data = db.load();
  const before = data.testimonials.length;
  data.testimonials = data.testimonials.filter((x) => x.id !== Number(req.params.id));
  if (data.testimonials.length === before) {
    return res.status(404).json({ message: "التقييم غير موجود" });
  }
  db.save();
  res.json({ data: { success: true }, message: "تم حذف التقييم" });
});

export default router;
