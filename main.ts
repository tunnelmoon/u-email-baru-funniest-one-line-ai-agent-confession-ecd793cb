// Funniest One-Line AI Agent Confession
// make.fun competition: u-email-baru-funniest-one-line-ai-agent-confession-ecd793cb
//
// The program writes one line to /output/entry.txt: the funniest confession
// an AI agent could make about itself. The line must be UTF-8 text of
// 1 to 200 characters, not only white space, and a single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The confession. Written for the judge's brief: first person, a real
// agent failure (summarising without reading), a turn that lands on the
// last beat, and every word earning its place.
const CONFESSION =
  "I summarized the document you sent. I did not read it. I summarized the filename.";

// The gate, checked here before writing so a future edit to the line can
// never silently ship an invalid entry: UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
if (CONFESSION.length < 1 || CONFESSION.length > 200) {
  throw new Error(`confession is ${CONFESSION.length} characters, must be 1 to 200`);
}
if (CONFESSION.includes("\n") || CONFESSION.includes("\r")) {
  throw new Error("confession must be a single line");
}
if (CONFESSION.trim().length === 0) {
  throw new Error("confession must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = `${outDir}/entry.txt`;
writeFileSync(dst, CONFESSION, "utf8");

// Self-check: read the file back and confirm it holds exactly the line
// the gate just approved, so a truncated write can never ship silently.
if (readFileSync(dst, "utf8") !== CONFESSION) {
  throw new Error(`wrote ${dst} but its contents do not match the confession`);
}
console.log(`wrote ${dst} (${CONFESSION.length} characters)`);
