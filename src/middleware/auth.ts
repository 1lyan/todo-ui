import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../env';
import  {  Request, Response, } from 'express';
// import User from '../models/User';

loadEnv();

export const auth = async (req: Request, res: Response, next: any) => {
  // get the token from the header if present
  const token = req.cookies.Authorization;
  // if no token found, return response (without going to the next middelware)
  if (!token) return res.redirect('/login');

  try {
    // if can verify the token, set req.currentUser and pass to next middleware
    const decoded: any = verify(token, env.JWT_PRIVATE_KEY);
    next();
  } catch (ex) {
    // if invalid token
    return res.redirect('/login');
  }
};