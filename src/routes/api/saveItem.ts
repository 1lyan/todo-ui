import express, { Request, Response, Router } from 'express';
const saveItemRouter: Router = express.Router();
import axios from 'axios';

import { auth } from '../../middleware/auth';

import { loadEnv, env } from '../../env';
loadEnv();

saveItemRouter.post('/api/save_item', auth, async  (req: Request, res: Response) => {
  try {
    const data = {
      text: req.body.text,
      token: req.cookies.Authorization,
      userId: req.cookies.userId
    }

    const result: any = await axios({
      method: 'post',
      url: '/api/save_item',
      baseURL: env.API_HOST,
      data
    });

    res.json(result.data);
  }
  catch(ex: any) {
    console.log('Error sending request to save Item', ex.message)
    return res.status(500).end();
  }
});

export default saveItemRouter;