import "dotenv/config";
import app from "./app.js";
import { db } from "./db.js";
import { defaultAdmin } from "./seed.js";

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "0.0.0.0";

db.load();

app.listen(PORT, HOST, () => {
  console.log("==============================================");
  console.log("  ☕ Qhwaji API (القهوجية)");
  console.log(`  العنوان: http://localhost:${PORT}/api`);
  console.log(`  قاعدة البيانات: ${db.file}`);
  console.log(`  حساب المدير: ${defaultAdmin.email}`);
  console.log(`  كلمة المرور: ${defaultAdmin.password}`);
  console.log("==============================================");
});
