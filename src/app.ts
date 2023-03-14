import createHttpError from 'http-errors';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index';
import signupRouter from './routes/signup';
import loginRouter from './routes/login';
import saveItemRouter from './routes/api/saveItem';
import deleteItemRouter from './routes/api/deleteItem';
import fetchItemsRouter from './routes/api/fetchItems';
import completeItemRouter from './routes/api/completeItem';
import uncompleteItemRouter from './routes/api/uncompleteItem';

const app: Express = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('query parser', 'simple')
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', signupRouter);
app.use('/', loginRouter);
app.use('/', saveItemRouter);
app.use('/', deleteItemRouter);
app.use('/', fetchItemsRouter);
app.use('/', completeItemRouter);
app.use('/', uncompleteItemRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: any) => {
  next(createHttpError('404'));
});

// error handler
app.use((err: any, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export default app;
