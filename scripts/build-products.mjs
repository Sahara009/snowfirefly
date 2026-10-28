// Собирает все свечи из src/data/products/*.json (их редактирует админка)
// в один файл src/data/products.json, который читает сайт.
// Запускается автоматически перед `npm run dev` и `npm run build`.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "src/data/products");
const out = path.join(process.cwd(), "src/data/products.json");

const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
const items = [];

for (const f of files) {
  try {
    const data = JSON.parse(await readFile(path.join(dir, f), "utf8"));
    if (!data.title || data.hidden) continue; // без названия или «скрыть с сайта»
    const clean = {};
    for (const [k, v] of Object.entries(data)) {
      if (v !== "" && v !== null && v !== undefined) clean[k] = v;
    }
    items.push({ ...clean, id: String(data.id || path.basename(f, ".json")) });
  } catch (e) {
    console.warn(`[products] пропускаю ${f}: ${e.message}`);
  }
}

const ord = (v) => (typeof v === "number" ? v : 0);
items.sort(
  (a, b) =>
    ord(a.order) - ord(b.order) ||
    String(b.created || "").localeCompare(String(a.created || "")) ||
    String(a.title).localeCompare(String(b.title), "ru"),
);

await writeFile(out, JSON.stringify({ items }, null, 2) + "\n");
console.log(`[products] ${items.length} шт. → src/data/products.json`);
