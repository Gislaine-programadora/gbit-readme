#!/usr/bin/env node

import banner from "../lib/banner.js";
import generateReadme from "../lib/generate.js";

async function main() {
  banner();
  await generateReadme();
}

main();
