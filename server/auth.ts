import { Router } from 'express';

// MOCK AUTH ROUTER
// This replaces real database, hashing, JWT, and Google OAuth with a simple in-memory check.
// Accepted credentials:
//   email:    alfred@fortizotechnologies.com
//   password: fortizo123
// All other routes return deterministic mock responses. No environment variables required.

const authRouter = Router();

const MOCK_USER = {
  id: 'mock-user-1',
  email: 'alfred@fortizotechnologies.com',
  fullName: 'Alfred (Mock)',
  mode: 'career',
  // Any additional fields expected by the client can be added here
};

// Health of mock (optional visibility)
console.log('Auth running in MOCK mode. Using fixed credentials for login.');

// Mock signup: simply return a created user without persistence
authRouter.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body || {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // In mock mode we "create" but do not persist. If email matches the mock, pretend it's already taken.
  if (email === MOCK_USER.email) {
    return res.status(409).json({ message: 'User with this email already exists (mock)' });
  }

  const created = {
    id: 'mock-user-new',
    email,
    fullName,
    mode: 'career',
  };

  // Return a static token-like string to satisfy clients expecting a token
  const token = 'mock-token-' + Buffer.from(email).toString('base64');

  return res.status(201).json({
    message: 'User created successfully (mock)',
    user: created,
    token,
  });
});

// Mock login: only accept the provided credentials
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email === MOCK_USER.email && password === 'fortizo123') {
    const token = 'mock-token-' + Buffer.from(MOCK_USER.email).toString('base64');
    return res.status(200).json({ message: 'Login successful (mock)', user: MOCK_USER, token });
  }

  return res.status(401).json({ message: 'Invalid credentials (mock)' });
});

// Mock Google OAuth: disabled in mock mode
authRouter.post('/google', async (_req, res) => {
  return res.status(501).json({ message: 'Google OAuth disabled in mock mode' });
});

export default authRouter;
