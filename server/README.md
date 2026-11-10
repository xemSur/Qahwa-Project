# Qhwaji API (القهوجية) — Backend

باكند بسيط بالعقد الذي يتوقعه تطبيق لوحة التحكم (`Dashboard/src/services/api.ts`).

## المتطلبات
- Node.js 18+
- (اختياري) Docker + Docker Compose

## التشغيل محلياً
```bash
copy .env.example .env
npm install
npm start
```

- العنوان: `http://localhost:8080/api`
- حساب المدير الافتراضي: `admin@qahwaji.com` / `Qahwaji@2026` (غيّرها من `.env`)

## التشغيل عبر Docker
```bash
copy .env.example .env
docker compose up -d --build
```

## نقاط النهاية

| الأسلوب | المسار | الوصف |
|---|---|---|
| POST | `/api/auth/login` | تسجيل الدخول → `{ token, name, email, role }` |
| GET | `/api/auth/verify` | التحقق من التوكن (Bearer) |
| POST | `/api/auth/send-otp` | إرسال رمز التحقق (placeholder) |
| POST | `/api/auth/verify-otp` | التحقق من الرمز (placeholder) |
| POST | `/api/auth/refresh-token` | تجديد التوكن |
| GET/POST/PUT/DELETE | `/api/providers` | إدارة القهوجيين |
| GET/POST/DELETE | `/api/bookings` | الحجوزات |
| PUT | `/api/bookings/:id/status` | تغيير حالة الحجز |
| GET/POST/PUT/DELETE | `/api/packages` | الباقات |
| GET/POST/DELETE | `/api/testimonials` | التقييمات |
| GET | `/api/dashboard/stats` | إحصائيات اللوحة |

## البيانات
- تُحفظ في ملف JSON: `server/data/db.json` (يُنشأ تلقائياً مع بيانات أولية عند أول تشغيل).
- لإعادة التهيئة: احذف ملف `db.json` وأعد تشغيل الخادم.

## ملاحظة على البورت 8080
إذا كانت هناك خدمة أخرى (مثل Docker/WSL) تستخدم البورت، غيّر `PORT` في `.env`
واعدّل `Dashboard/src/services/api.ts` بالمطابقة، أو استخدم Cloudflare Tunnel
كما هو موضح في `../README-cloudflared.md`.
