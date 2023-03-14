import express, { Request, Response, Router } from 'express';
const completeItemRouter: Router = express.Router();
import axios from 'axios';

import { auth } from '../../middleware/auth';

import { loadEnv, env } from '../../env';
loadEnv();

completeItemRouter.post('/api/complete_item', auth, async  (req: Request, res: Response) => {
  try {
    const data = {
      id: req.body.id,
      token: req.cookies.Authorization,
      userId: req.cookies.userId
    }

    const result: any = await axios({
      method: 'post',
      url: '/api/complete_item',
      baseURL: env.API_HOST,
      data
    });

    res.json(result.data);
  }
  catch(ex: any) {
    console.log('Error sending request to complete Item', ex.message)
    return res.status(500).end();
  }
});

export default completeItemRouter;