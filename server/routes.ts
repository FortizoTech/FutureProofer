import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, db } from "./storage.js";
import { Router } from "express";
import authRouter from "./auth.js";
import { sql } from 'drizzle-orm';

const api = Router();

// Health check endpoint
api.get("/health", async (req, res) => {
  try {
    // Test database connection
    await db.execute(sql`SELECT 1`);
    res.json({ 
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: "error",
      database: "connection failed",
      error: error.message
    });
  }
});

// Auth routes
api.use('/auth', authRouter);

// Add other API routes here

export { api };

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
