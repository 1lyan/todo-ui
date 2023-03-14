import express, { Request, Response, Router } from 'express';
const deleteItemRouter: Router = express.Router();
import axios from 'axios';

import { auth } from '../../middleware/auth';

import { loadEnv, env } from '../../env';
loadEnv();

deleteItemRouter.delete('/api/delete_item/:itemId', auth, async  (req: Request, res: Response) => {
  try {
    const data = {
      itemId: req.params.itemId,
      token: req.cookies.Authorization,
      userId: req.cookies.userId
    }

    const result: any = await axios.delete(
      `${env.API_HOST}/api/delete_item/${data.itemId}`,
      { data }
    );

    res.json(result.data);
  }
  catch(ex: any) {
    console.log('Error sending request to delete an item', ex.message)
    return res.status(500).end();
  }
});

export default deleteItemRouter;