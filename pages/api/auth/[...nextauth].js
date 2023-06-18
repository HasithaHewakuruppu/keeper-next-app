// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import nextAuthConfig from '../../../next-auth.config';
import { connectToDatabase } from '../../../db';

export default (req, res) => {
  connectToDatabase()
    .then(() => NextAuth(req, res, nextAuthConfig))
    .catch((err) => {
      console.error('Failed to connect to database', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};