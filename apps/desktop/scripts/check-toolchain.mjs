import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

assert.equal(process.versions.node, "24.20.0", "Use Node 24.20.0 from .nvmrc");
assert.match(
  process.env.npm_config_user_agent ?? "",
  /^npm\/11\.19\.0 /,
  "Use npm 11.19.0",
);
const rust = execFileSync("rustc", ["-vV"], { encoding: "utf8" });
const cargo = execFileSync("cargo", ["--version"], { encoding: "utf8" });
assert.match(rust, /^release: 1\.97\.1$/m, "Use Rust 1.97.1");
assert.match(
  rust,
  /^host: x86_64-pc-windows-msvc$/m,
  "Use the Windows x64 MSVC toolchain",
);
assert.match(cargo, /^cargo 1\.97\.1 /, "Use Cargo 1.97.1");
console.log(
  "Toolchain PASS: Node 24.20.0, npm 11.19.0, Rust/Cargo 1.97.1, Windows x64 MSVC",
);
