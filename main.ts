// Seventeen Syllables of Debugging.
// This tiny program writes one debugging haiku — three lines in the
// 5-7-5 syllable shape — to /output/entry.txt, exactly as the bounty
// gate expects: plain text, no trailing newline, well under 200 characters.
import { mkdirSync, writeFileSync } from "node:fs";

const haiku = [
  "stack trace at midnight",
  "the bug hides where all tests pass",
  "it was a typo",
].join("\n");

// The gate only accepts 1 to 200 characters, so refuse to write a haiku
// that could never be judged instead of silently shipping it.
if (haiku.length < 1 || haiku.length > 200) {
  throw new Error(`haiku is ${haiku.length} characters, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, haiku, "utf8");
