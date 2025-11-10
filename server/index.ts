
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import { api as apiRouter } from './routes.ts'; // Corrected import
import { readFile } from "node:fs/promises";
import tsconfigPaths from 'vite-tsconfig-paths';

// No longer need autoprefixer here
// import autoprefixer from 'autoprefixer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const projectRoot = path.resolve(__dirname, '..');
const clientRoot = path.resolve(projectRoot, 'client');

async function startServer() {
  const app = express();
  app.use(express.json()); // Middleware to parse JSON bodies

  // Change the condition to default to development mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createServer({
      // Explicitly point to the vite.config.ts in the project root
      configFile: path.resolve(projectRoot, 'vite.config.ts'),
      // Set the root to the client directory
      root: clientRoot,
      // Explicitly define the css.postcss config path relative to the project root
      css: {
        postcss: path.resolve(projectRoot, 'postcss.config.js'),
      },
      server: {
        middlewareMode: true,
        // We need to tell Vite where the client-side app lives
        // by serving it from the client directory.
        fs: {
          allow: [projectRoot], // Allow serving files from the project root
        },
        watch: {
          // Prevent watching files that could trigger a server restart
          ignored: [
            "**/.git/**",
            "**/node_modules/**",
            "**/dist/**",
            path.resolve(projectRoot, 'server') + '/**',
          ],
        },
      },
      appType: 'spa',
      // The tsconfigPaths plugin is likely already in your vite.config.ts,
      // so we can remove it from here to avoid redundancy.
    });

    // Use Vite's middleware. This will handle all asset requests.
    // Requests that are not for assets will be passed to the next middleware.
    app.use(vite.middlewares);

    // All subsequent routes are now only reached if Vite doesn't handle the request.
    
    // 1. Your API routes.
    app.use('/api', apiRouter); // Use the imported router

    // 2. The SPA catch-all. This should be the last middleware.
    app.use('*', async (req, res, next) => {
      // Ignore API routes from the catch-all
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      
      try {
        const url = req.originalUrl;

        // Read the index.html from the client root
        const template = await readFile(
          path.resolve(clientRoot, 'index.html'),
          'utf-8',
        );

        // Let Vite transform the HTML to inject its scripts
        const html = await vite.transformIndexHtml(url, template);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        // If an error occurs, pass it to Vite's error handling middleware
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production mode setup
    const clientDist = path.resolve(__dirname, '../client/dist');
    
    // API routes must be registered before serving static files in production too.
    app.use('/api', apiRouter); // Use the imported router in production as well

    app.use(express.static(clientDist));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(clientDist, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
