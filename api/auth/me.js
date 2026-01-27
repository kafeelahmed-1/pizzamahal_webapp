import connectDB from '../connectDB.js';
import User from '../../backend/models/User.js';
import jwt from 'jsonwebtoken';

const protect = async (req, res) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      return true;
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
      return false;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return false;
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await connectDB();

  if (req.method === 'GET') {
    const isProtected = await protect(req, res);
    if (isProtected) {
      await getMe(req, res);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}