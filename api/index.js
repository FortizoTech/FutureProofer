// server/index.ts
import "../node_modules/dotenv/config.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "../node_modules/express/index.js";
import { createServer } from "../node_modules/vite/dist/node/index.js";
import { readFile } from "node:fs/promises";

// server/storage.ts
import { neon } from "../node_modules/@neondatabase/serverless/index.mjs";
import { drizzle } from "../node_modules/drizzle-orm/neon-http/index.js";
import { eq } from "../node_modules/drizzle-orm/index.js";

// server/db/schema.ts
import { pgTable, text, varchar, jsonb, timestamp } from "../node_modules/drizzle-orm/pg-core/index.js";
import { sql } from "../node_modules/drizzle-orm/index.js";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  mode: text("mode", { enum: ["career", "business"] }).notNull(),
  profileData: jsonb("profile_data"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login").defaultNow()
});

// server/storage.ts
console.log("Storage init: DATABASE_URL", process.env.DATABASE_URL ? "set" : "missing");
var sql2;
try {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  sql2 = neon(process.env.DATABASE_URL);
} catch (error) {
  console.error("Database initialization error:", error);
  sql2 = null;
}
var db = sql2 ? drizzle(sql2, { schema: { users } }) : null;
var DrizzleStorage = class {
  async getUser(id) {
    if (!db) {
      throw new Error("Database connection not available. Check DATABASE_URL environment variable.");
    }
    const result = await db.query.users.findFirst({
      where: eq(users.id, id)
    });
    return result;
  }
  async getUserByUsername(username) {
    if (!db) {
      throw new Error("Database connection not available. Check DATABASE_URL environment variable.");
    }
    const result = await db.query.users.findFirst({
      where: eq(users.username, username)
    });
    return result;
  }
  async createUser(insertUser) {
    if (!db) {
      throw new Error("Database connection not available. Check DATABASE_URL environment variable.");
    }
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
};
var storage = new DrizzleStorage();

// server/routes.ts
import { Router as Router2 } from "../node_modules/express/index.js";

// server/auth.ts
import { Router } from "../node_modules/express/index.js";
import { OAuth2Client } from "../node_modules/google-auth-library/build/src/index.js";
import jwt from "../node_modules/jsonwebtoken/index.js";
var authRouter = Router();
var googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
var JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
var users2 = /* @__PURE__ */ new Map();
var MOCK_USER = {
  id: "mock-user-1",
  email: "alfred@fortizotechnologies.com",
  fullName: "Alfred (Mock)",
  mode: "career"
};
users2.set(MOCK_USER.email, { ...MOCK_USER, password: "fortizo123" });
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      mode: user.mode
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}
authRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body || {};
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (users2.has(email)) {
    return res.status(409).json({ message: "User with this email already exists" });
  }
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    fullName,
    mode: "career",
    password
    // In production: await bcrypt.hash(password, 10)
  };
  users2.set(email, newUser);
  const token = generateToken(newUser);
  return res.status(201).json({
    message: "User created successfully",
    user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, mode: newUser.mode },
    token
  });
});
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = users2.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user);
  return res.status(200).json({
    message: "Login successful",
    user: { id: user.id, email: user.email, fullName: user.fullName, mode: user.mode },
    token
  });
});
authRouter.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ message: "Invalid token payload" });
    }
    let user = users2.get(payload.email);
    if (!user) {
      user = {
        id: `user-${Date.now()}`,
        email: payload.email,
        fullName: payload.name || "Google User",
        mode: "career",
        googleId: payload.sub
      };
      users2.set(payload.email, user);
    }
    const token = generateToken(user);
    return res.status(200).json({
      message: "Google authentication successful",
      user: { id: user.id, email: user.email, fullName: user.fullName, mode: user.mode },
      token
    });
  } catch (error) {
    console.error("Google OAuth error:", error);
    return res.status(401).json({ message: "Google authentication failed" });
  }
});
var auth_default = authRouter;

// server/routes.ts
import { sql as sql3 } from "../node_modules/drizzle-orm/index.js";
var api = Router2();
api.get("/health", async (req, res) => {
  try {
    await db.execute(sql3`SELECT 1`);
    res.json({
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      status: "error",
      database: "connection failed",
      error: error.message
    });
  }
});
api.use("/auth", auth_default);

// server/index.ts
var app = express();
var port = process.env.PORT || 3001;
app.use(express.json());
app.use("/api", api);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});
if (process.env.NODE_ENV !== "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "..");
  const clientRoot = path.resolve(projectRoot, "client");
  async function startDevServer() {
    const vite = await createServer({
      configFile: path.resolve(projectRoot, "vite.config.ts"),
      root: clientRoot,
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) return next();
      try {
        const url = req.originalUrl;
        const template = await readFile(path.resolve(clientRoot, "index.html"), "utf-8");
        const html = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }
  startDevServer();
} else {
}
if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
var index_default = app;
export {
  index_default as default
};
