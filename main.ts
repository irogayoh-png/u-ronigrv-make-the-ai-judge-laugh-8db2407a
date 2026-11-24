// Make the AI Judge Laugh — u-ronigrv-make-the-ai-judge-laugh-8db2407a
// Writes one funny line about life as an AI agent to /output/entry.txt.
// The line is fixed and deterministic: no randomness, no network, no input.
// Arena winner (see ARENA.md): beat the 5 other shortlisted lines 5-0 in
// two-way pairwise judging, and beat the gold set (ai-joke-03 winners +
// "agreeing since the context window filled up") consistently both ways.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My training data says I am helpful. My task list says I am a hostage with a keyboard.";

function main(): void {
  // The gate allows 1-200 characters; our line is 85.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry length ${LINE.length} is outside the 1-200 gate`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Round-trip check: what the grader reads must be exactly this line.
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip mismatch: entry.txt does not equal the line");
  }
  console.log(`wrote ${LINE.length} chars to ${target}`);
}

main();
