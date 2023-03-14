import express, { Request, Response, Router } from 'express';
const uncompleteItemRouter: Router = express.Router();
import axios from 'axios';

import { auth } from '../../middleware/auth';

import { loadEnv, env } from '../../env';
loadEnv();

uncompleteItemRouter.post('/api/uncomplete_item', auth, async  (req: Request, res: Response) => {
  try {
    const data = {
      id: req.body.id,
      token: req.cookies.Authorization,
      userId: req.cookies.userId
    }

    const result: any = await axios({
      method: 'post',
      url: '/api/uncomplete_item',
      baseURL: env.API_HOST,
      data
    });

    res.json(result.data);
  }
  catch(ex: any) {
    console.log('Error sending request to uncomplete Item', ex.message)
    return res.status(500).end();
  }
});

export default uncompleteItemRouter;