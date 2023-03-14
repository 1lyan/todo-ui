import express, { Request, Response, Router } from 'express';
const loginRouter: Router = express.Router();
import axios from 'axios';

import { loadEnv, env } from '../env';
loadEnv();

loginRouter.get('/login', async  (req: Request, res: Response) => {
  let success = "";
  if (req.query.success) {
    success = 'You have been registered successfully. Please, login to continue';
  }

  res.render('login', { errorMessage: '', success });
});

loginRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    }

    const result: any = await axios({
      method: 'post',
      url: '/api/login',
      baseURL: env.API_HOST,
      data: user
    });

    const expirationDate = new Date(Date.now() + 60*60*24 * 1000);
    res.cookie('Authorization', result.data.token, { expires: expirationDate });
    res.cookie('userId', result.data.userId, { expires: expirationDate });
    res.redirect('/');
  }
  catch (ex: any) {
    console.log('Crashed at login', ex.message);
    return;
  }

});

export default loginRouter;