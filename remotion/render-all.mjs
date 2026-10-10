import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";

const BUNDLE_DIR = "build/remotion";

const remotion = (args, options) => execFileSync("npx", ["remotion", ...args], options);

// Bundle sekali untuk semua klip: tiap bundle menyalin video sumber, jadi mengulanginya
// per klip membuang waktu dan ruang disk.
remotion(["bundle", "--out-dir", BUNDLE_DIR], { stdio: "inherit" });

try {
  const ids = remotion(["compositions", BUNDLE_DIR, "--quiet"], { encoding: "utf8" })
    .trim()
    .split(/\s+/);

  for (const id of ids) {
    remotion(["render", BUNDLE_DIR, id], { stdio: "inherit" });
  }
} finally {
  rmSync(BUNDLE_DIR, { recursive: true, force: true });
}
