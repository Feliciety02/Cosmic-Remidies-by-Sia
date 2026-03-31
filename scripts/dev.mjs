import { spawn } from "node:child_process";
import http from "node:http";

const child = spawn("npx", ["next", "dev"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: ["inherit", "pipe", "pipe"],
  shell: true,
});

let warmed = false;
let warming = false;
let localUrl = "http://127.0.0.1:3000/";

const prewarmHomePage = () => {
  if (warmed || warming) {
    return;
  }

  warming = true;

  const request = http.get(localUrl, (response) => {
    response.resume();
    response.on("end", () => {
      warmed = true;
      warming = false;
      process.stdout.write("\n[dev] Prewarmed /\n");
    });
  });

  request.on("error", () => {
    warming = false;
    setTimeout(prewarmHomePage, 1000);
  });

  request.setTimeout(10000, () => {
    request.destroy();
    warming = false;
    setTimeout(prewarmHomePage, 1000);
  });
};

child.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);

  const localMatch = text.match(/Local:\s+(http:\/\/[^\s]+)/);
  if (localMatch) {
    localUrl = localMatch[1].replace("localhost", "127.0.0.1");
    if (!localUrl.endsWith("/")) {
      localUrl = `${localUrl}/`;
    }
  }

  if (!warmed && text.includes("Ready in")) {
    setTimeout(prewarmHomePage, 250);
  }
});

child.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
});

const forwardSignal = (signal) => {
  if (!child.killed) {
    child.kill(signal);
  }
};

process.on("SIGINT", () => forwardSignal("SIGINT"));
process.on("SIGTERM", () => forwardSignal("SIGTERM"));

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
