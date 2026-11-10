# نشر موقع القهوجية عبر Docker + Nginx + Cloudflare Tunnel

## البنية
```
Cloudflare (نطاقك العام)
   └── cloudflared ──> web (nginx :80) ──> /api ──> api (node :8080)
                        └── الموقع الثابت (Vite build)
```

- الموقع يُبنى ويُخدم عبر **Nginx** داخل حاوية.
- Nginx يعكس مسار `/api` إلى الباكند داخل شبكة Docker (بدون كشف بورت 8080 على الجهاز).
- **نطاق واحد** يخدم الموقع والـ API معاً (`https://دومينك.com` + `https://دومينك.com/api`).

---

## ١) التشغيل (مرة واحدة)

**ملف `.env`**: تأكد أنه يحتوي التوكن:
```
TUNNEL_TOKEN=eyJ...التوكن من لوحة Cloudflare...
WEB_PORT=8082
```

> `WEB_PORT` هو بورت المعاينة المحلية. بورت 80 على هذا الجهاز محجوز (IIS)،
> لذا استخدمنا 8082. بعد إيقاف الخدمة المحتلة يمكنك ضبط `WEB_PORT=80` أو حذف السطر.

**البناء والتشغيل:**
```bash
docker compose up -d --build
```

**التحقق:**
- الموقع: `http://localhost:8082`
- الـ API عبر Nginx: `http://localhost:8082/api/health`
- النفق: `docker logs qhwaji-cloudflared` (يجب أن يعرض Connected)

---

## ٢) ربط النطاق العام بالنفق

في لوحة Cloudflare (Zero Trust → Networks → Tunnels → النفق الخاص بك):

1. اضغط **Public Hostname** ← **Add a public hostname**.
2. **Domain**: اختر دومينك المسجّل في Cloudflare.
3. **Subdomain**: `www` (أو تركه فارغاً للدومين الرئيسي).
4. **Service type**: `HTTP` و **URL**: `web:80`
   - (النفق هنا يعمل كحاوية بنفس شبكة `docker compose`، لذا يصل لحاوية nginx باسمها `web`).
5. احفظ، ثم افتح نطاقك: `https://دومينك.com` واختبر `https://دومينك.com/api/health`.

> ⚠️ **مهم جداً**: لأن `cloudflared` يعمل **داخل حاوية Docker**، كلمة `localhost` هناك تعني الحاوية
> نفسها وليست nginx. اجعل الـ URL في اللوحة **`web:80`** حصراً (اسم خدمة nginx في الشبكة)،
> وليس `localhost:80` — وإلا سيفشل الاتصال.
> بعد التعديل من اللوحة، يحدّث النفق إعداده تلقائياً خلال ثوانٍ (سترى `Updated to new configuration`
> في سجل الحاوية).

---

## ٣) توصيل تطبيق لوحة التحكم (Dashboard)

عدّل `Dashboard/src/services/api.ts:4` من:
```ts
const API_URL = "http://localhost:8080/api";
```
إلى:
```ts
const API_URL = "https://دومينك.com/api";
```

> الأفضل قراءة العنوان من `app.json` → `expo.extra.apiUrl` لتجميع العناوين في مكان واحد.

---

## ٤) إيقاف / إعادة التشغيل

| الأمر | الوصف |
|---|---|
| `docker compose up -d --build` | البناء والتشغيل |
| `docker compose logs -f web api cloudflared` | متابعة السجلات |
| `docker compose down` | إيقاف الخدمات |
| `docker compose down && docker compose up -d --build` | إعادة النشر بعد تعديل |

---

## أمان

- غيّر `JWT_SECRET` و`ADMIN_PASSWORD` في `.env` قبل النشر العام.
- الملف `.env` مستثنى من git — لا ترفعه أبداً.
- ننصح بحماية `/api` بقاعدة **Cloudflare Access** إذا أردت إخفاء الـ API عن العامة.
