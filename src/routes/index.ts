import express, { Request, Response, Router } from 'express';
const indexRouter: Router = express.Router();
import { auth } from '../middleware/auth';
import axios from 'axios';

import { loadEnv, env } from '../env';
loadEnv();

indexRouter.get('/', auth, async  (req: Request, res: Response) => {
  const user = {
    userId: req.cookies.userId,
    token: req.cookies.Authorization
  }
  const items: any = await axios({method: 'get', url: '/api/index', baseURL: env.API_HOST, data: user});

  res.render('index', { todoItems: items.data });
});

export default indexRouter;