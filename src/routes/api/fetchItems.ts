import express, { Request, Response, Router } from 'express';
const fetchItemsRouter: Router = express.Router();
import { auth } from '../../middleware/auth';
import axios from 'axios';

import { loadEnv, env } from '../../env';
loadEnv();

fetchItemsRouter.get('/api/fetch_items', auth, async  (req: Request, res: Response) => {
  const data = {
    userId: req.cookies.userId,
    token: req.cookies.Authorization,
    status: req.query.status
  }

  const items: any = await axios({
    method: 'get',
    url: '/api/index',
    baseURL: env.API_HOST,
    data
  });

  res.json(items.data);
});

export default fetchItemsRouter;