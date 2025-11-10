
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// Use node: prefix for explicit import
import { readFile } from "node:fs/promises";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function viteExpress(app: express.Application) {
  if (process.env.NODE_ENV === "development") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;

        // Read the template file from the client directory
        const templateHtml = await readFile(
          path.resolve(__dirname, "../../client/index.html"),
          "utf-8"
        );

        // Let Vite transform the HTML
        const template = await vite.transformIndexHtml(url, templateHtml);

        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, "../public");
    app.use(express.static(distPath));
    app.use("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }
}
