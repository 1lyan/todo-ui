import express, { Request, Response, Router } from 'express';
const signupRouter: Router = express.Router();
import axios from 'axios';

import { loadEnv, env } from '../env';
loadEnv();

signupRouter.get('/signup', async (req: Request, res: Response) => {
  let success = "";
  if (req.query.success) {
    success = 'Account was deleted';
  }

  res.render('signup', { errorMessage: '', success });
});

signupRouter.post('/signup', async  (req: Request, res: Response) => {
  const success = '';

  try {
    const user = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password // setting unencrypted password here to do validation
    };
    try {
      await axios({method: 'post', url: '/api/signup', baseURL: env.API_HOST, data: user});
      res.redirect('/login?success=ok');
    }
    catch(e: any) {
      console.log('Failed to POST to /api/signup', e.message)
      res.render('signup', { errorMessage: e.message, success });
    }

  } catch(e:any) {
    res.render('signup', { errorMessage: e.message, success });
  }
});

export default signupRouter;