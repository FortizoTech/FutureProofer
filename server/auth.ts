import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const authRouter = Router();

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// JWT secret - in production, use a strong secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Mock user database (replace with real database in production)
const users = new Map();

// Mock user for testing
const MOCK_USER = {
  id: 'mock-user-1',
  email: 'alfred@fortizotechnologies.com',
  fullName: 'Alfred (Mock)',
  mode: 'career',
};
users.set(MOCK_USER.email, { ...MOCK_USER, password: 'fortizo123' });

// Helper function to generate JWT token
function generateToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      mode: user.mode
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Signup endpoint
authRouter.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body || {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  if (users.has(email)) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  // Create new user (in production, hash the password with bcrypt)
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    fullName,
    mode: 'career',
    password, // In production: await bcrypt.hash(password, 10)
  };

  users.set(email, newUser);

  const token = generateToken(newUser);

  return res.status(201).json({
    message: 'User created successfully',
    user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, mode: newUser.mode },
    token,
  });
});

// Login endpoint
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.get(email);

  if (!user || user.password !== password) {
    // In production: await bcrypt.compare(password, user.password)
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);

  return res.status(200).json({
    message: 'Login successful',
    user: { id: user.id, email: user.email, fullName: user.fullName, mode: user.mode },
    token,
  });
});

// Google OAuth endpoint
authRouter.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'ID token is required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Invalid token payload' });
    }

    // Check if user exists, if not create new user
    let user = users.get(payload.email);

    if (!user) {
      user = {
        id: `user-${Date.now()}`,
        email: payload.email,
        fullName: payload.name || 'Google User',
        mode: 'career',
        googleId: payload.sub,
      };
      users.set(payload.email, user);
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: 'Google authentication successful',
      user: { id: user.id, email: user.email, fullName: user.fullName, mode: user.mode },
      token,
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    return res.status(401).json({ message: 'Google authentication failed' });
  }
});

export default authRouter;
