import { type User, type InsertUser } from "../shared/schema.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { users } from './db/schema.js';

console.log('Storage init: DATABASE_URL', process.env.DATABASE_URL ? 'set' : 'missing');

let sql;
try {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  sql = neon(process.env.DATABASE_URL);
} catch (error) {
  console.error('Database initialization error:', error);
  sql = null;
}

export const db = sql ? drizzle(sql, { schema: { users } }) : null;

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DrizzleStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    if (!db) {
      throw new Error('Database connection not available. Check DATABASE_URL environment variable.');
    }
    const result = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return result;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) {
      throw new Error('Database connection not available. Check DATABASE_URL environment variable.');
    }
    const result = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    return result;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) {
      throw new Error('Database connection not available. Check DATABASE_URL environment variable.');
    }
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
}

export const storage = new DrizzleStorage();
