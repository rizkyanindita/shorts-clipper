import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./remotion/index.ts");

// Video sumber disimpan di sini dan tidak masuk git (lihat .gitignore).
Config.setPublicDir("./remotion/public");

Config.setOverwriteOutput(true);
