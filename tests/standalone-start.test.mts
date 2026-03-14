import assert from "node:assert/strict";

import packageJson from "../package.json" with { type: "json" };

assert.equal(
  packageJson.scripts.start,
  "node .next/standalone/server.js",
  "standalone output must be started with the standalone server entrypoint",
);

assert.equal(
  packageJson.scripts["postbuild"],
  "node scripts/prepare-standalone.mjs",
  "standalone assets must be copied into the standalone directory after build",
);

console.log("standalone start script assertions passed");
