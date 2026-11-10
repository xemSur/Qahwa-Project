import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSeed } from "./seed.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DB_FILE = path.join(__dirname, "..", "data", "db.json");
const DB_FILE = process.env.DB_FILE ? path.resolve(process.env.DB_FILE) : DEFAULT_DB_FILE;
const DB_DIR = path.dirname(DB_FILE);

let cache = null;

function load() {
  if (cache) return cache;
  if (fs.existsSync(DB_FILE)) {
    cache = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } else {
    cache = buildSeed();
    save();
    console.log(`[db] seeded fresh database at ${DB_FILE}`);
  }
  return cache;
}

function save() {
  fs.mkdirSync(DB_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(cache, null, 2));
}

function nextId(collection) {
  const db = load();
  const current = db.nextIds?.[collection] ?? 0;
  db.nextIds[collection] = current + 1;
  return db.nextIds[collection];
}

function reset() {
  cache = null;
}

export const db = { load, save, nextId, reset, file: DB_FILE };
