import type { Browser } from "puppeteer-core";

// Launch a headless Chromium suitable for both Vercel (serverless) and local
// development. On Vercel / AWS Lambda we use @sparticuz/chromium; locally we
// fall back to a system-installed Chrome/Chromium binary.

const CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  process.env.CHROME_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].filter(Boolean) as string[];

async function resolveLocalExecutable(): Promise<string> {
  const { existsSync } = await import("fs");
  for (const p of CHROME_CANDIDATES) {
    if (existsSync(p)) return p;
  }
  throw new Error(
    "No local Chrome/Chromium found. Set PUPPETEER_EXECUTABLE_PATH or install Chrome.",
  );
}

export async function launchBrowser(): Promise<Browser> {
  const isServerless = !!process.env.VERCEL || !!process.env.AWS_REGION;
  const puppeteer = await import("puppeteer-core");

  if (isServerless) {
    const chromiumMod = await import("@sparticuz/chromium");
    const chromium = chromiumMod.default ?? chromiumMod;
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    }) as unknown as Browser;
  }

  const executablePath = await resolveLocalExecutable();
  return puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1240, height: 1754, deviceScaleFactor: 2 },
    executablePath,
    headless: true,
  }) as unknown as Browser;
}
