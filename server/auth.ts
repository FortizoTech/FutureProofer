import { Router } from 'express';
import { storage } from './storage.js';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { users } from './db/schema.js';
import { db } from './storage.js';

const authRouter = Router();
const saltRounds = 10;

console.log('Auth init: DATABASE_URL', process.env.DATABASE_URL ? 'set' : 'missing');
console.log('Auth init: GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID ? 'set' : 'missing');
console.log('Auth init: JWT_SECRET', process.env.JWT_SECRET ? 'set' : 'missing');

let googleClient;
try {
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID environment variable is not set');
  }
  googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
} catch (error) {
  console.error('Google client initialization error:', error);
  googleClient = null;
}

// Signup route
authRouter.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  try {
    const existingUser = await storage.getUserByUsername(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await storage.createUser({
      username: email,
      fullName,
      email,
      password: hashedPassword,
      mode: 'career', // default mode
    });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName }, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: (error as Error).message || 'Internal server error' });
  }
});

// Login route
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await storage.getUserByUsername(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Login successful', user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: (error as Error).message || 'Internal server error' });
  }
});

// Google OAuth route
authRouter.post('/google', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'ID token is required' });
  }

  if (!googleClient) {
    return res.status(500).json({ message: 'Google client not initialized. Check GOOGLE_CLIENT_ID environment variable.' });
  }

  try {
    // Verify the ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ message: 'Invalid ID token' });
    }

    // Extract user data
    const googleId = payload.sub!;
    const fullName = payload.name!;
    const email = payload.email!;
    const picture = payload.picture;

    if (!db) {
      throw new Error('Database connection not available. Check DATABASE_URL environment variable.');
    }

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    let user;
    if (existingUser) {
      // Update last login
      [user] = await db.update(users).set({ lastLogin: new Date() }).where(eq(users.id, existingUser.id)).returning();
    } else {
      // Create new user
      [user] = await db.insert(users).values({
        username: email, // Use email as username for Google users
        password: '', // No password for OAuth users
        fullName,
        email,
        mode: 'career', // Default mode
        profileData: { googleId, picture },
      }).returning();
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email, fullName: user.fullName }, token });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: (error as Error).message || 'Authentication failed' });
  }
});

export default authRouter;
