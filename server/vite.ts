
import { Express } from "express";
import { createServer } from "vite";

export async function useVite(app: Express) {
  // Create Vite server in middleware mode.
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa", // Our app is a single-page app
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  // This will handle all other routes and serve the index.html
  // from Vite's dev server.
  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;

      // This will be your `client/index.html` file
      let template = await vite.transformIndexHtml(url, "");

      // Send the transformed HTML to the client.
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      // If an error is caught, let Vite display it.
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
