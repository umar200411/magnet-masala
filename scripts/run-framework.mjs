import { fileURLToPath } from "node:url";

const [command, ...args] = process.argv.slice(2);
if (!["dev", "build"].includes(command)) throw new Error("Expected dev or build.");

// Next's static exporter supports directory routes without vinext beta's
// prerender redirect bug. Keep the existing vinext development experience.
const cli = new URL(command === "build"
  ? "../node_modules/next/dist/bin/next"
  : "../node_modules/vinext/dist/cli.js", import.meta.url);
process.argv = [process.execPath, fileURLToPath(cli), command,
  ...(command === "dev" ? ["--port", "5173"] : []), ...args];
await import(cli.href);
