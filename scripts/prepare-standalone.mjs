import { cp, mkdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";

const standaloneDir = ".next/standalone";
const standaloneStaticDir = join(standaloneDir, ".next/static");
const standalonePublicDir = join(standaloneDir, "public");

await ensureExists(standaloneDir);

await copyDir(".next/static", standaloneStaticDir);
await copyDir("public", standalonePublicDir);

async function ensureExists(path) {
  try {
    await stat(path);
  } catch {
    throw new Error(`Missing standalone build output at ${path}. Run \`next build\` first.`);
  }
}

async function copyDir(source, destination) {
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination === standalonePublicDir ? standaloneDir : join(standaloneDir, ".next"), {
    recursive: true,
  });
  await cp(source, destination, { recursive: true });
}
