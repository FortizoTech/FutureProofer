
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'vite';
import { readFile } from "node:fs/promises";
import { api as apiRouter } from './routes.js'; // Make sure your build process outputs .js or resolves this

const app = express();
const port = process.env.PORT || 3001;

// Common setup
app.use(express.json());
app.use(apiRouter);

// Set COOP header for Google popup
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

// --- Development-only logic ---
if (process.env.NODE_ENV !== 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '..');
  const clientRoot = path.resolve(projectRoot, 'client');

  async function startDevServer() {
    const vite = await createServer({
      configFile: path.resolve(projectRoot, 'vite.config.ts'),
      root: clientRoot,
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      try {
        const url = req.originalUrl;
        const template = await readFile(path.resolve(clientRoot, 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  startDevServer();
} else {
  // NOTE: The production 'else' block that served static files has been removed.
  // Vercel will handle serving the frontend.
}

// Only listen in development mode or when explicitly running the server
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

// Export for Vercel serverless function
export default app;
