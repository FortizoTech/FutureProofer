import express from "express";
import { createServer } from "http";
import viteExpress from "./viteExpress";

const port = process.env.PORT || 5000;
const log = (message: string) => console.log(`[Server] ${message}`);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  // Let viteExpress handle middleware and serving files
  await viteExpress(app);

  httpServer.listen(port, () => {
    log(`Server running on http://localhost:${port}`);
  });
}

startServer();
