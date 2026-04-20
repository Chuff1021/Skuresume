#!/usr/bin/env node
// Render the 3 new templates to /samples/*.pdf using the running dev server
// (expected at http://localhost:3000). Usage:
//   node scripts/render-samples.mjs

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SAMPLES_DIR = resolve(__dirname, "..", "samples");
const BASE_URL = process.env.SAMPLE_BASE_URL || "http://localhost:3000";

const TEMPLATES = [
  { id: "modern-minimal", file: "modern-minimal.pdf" },
  { id: "executive-classic", file: "executive-classic.pdf" },
  { id: "two-column-technical", file: "two-column-technical.pdf" },
];

const CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  process.env.CHROME_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

function resolveExec() {
  for (const p of CHROME_CANDIDATES) if (existsSync(p)) return p;
  throw new Error("Chrome/Chromium not found. Set PUPPETEER_EXECUTABLE_PATH.");
}

async function ensureServerReady() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE_URL}/`);
      if (res.ok || res.status === 404) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Dev server did not respond at ${BASE_URL} within 30s.`);
}

async function main() {
  if (!existsSync(SAMPLES_DIR)) mkdirSync(SAMPLES_DIR, { recursive: true });
  await ensureServerReady();

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1240, height: 1754, deviceScaleFactor: 2 },
    executablePath: resolveExec(),
    headless: true,
  });

  try {
    for (const tpl of TEMPLATES) {
      const url = `${BASE_URL}/sample/${tpl.id}?mode=pdf&format=letter`;
      const page = await browser.newPage();
      console.log(`[render] ${tpl.id} <- ${url}`);
      await page.emulateMediaType("screen");
      await page.goto(url, { waitUntil: "networkidle0", timeout: 45_000 });
      await page.waitForFunction("window.__RESUME_READY__ === true", { timeout: 30_000 });

      const pdf = await page.pdf({
        format: "Letter",
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });
      const out = resolve(SAMPLES_DIR, tpl.file);
      writeFileSync(out, pdf);
      console.log(`[ok]     wrote ${out} (${pdf.byteLength.toLocaleString()} bytes)`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
