import {Application} from 'express';
// import path from 'path';
import expressPinoLogger from 'express-pino-logger';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import logger from './logger';
import ErrorMiddleware from './middleware/error';

import mediaRouter from './modules/media/route';
import authRouter from './modules/auth/route';
import userRouter from './modules/users/route';
import postRouter from './modules/posts/route';
import likeRouter from './modules/likes/route';
import commentRouter from './modules/comments/route';
import chatsRouter from './modules/chats/route';

export default async (app: Application) => {
  app.use(
    expressPinoLogger({
      logger: logger,
      autoLogging: true,
    }),
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());

  const whitelist = [
    undefined,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://ateworld.site',
    'http://www.ateworld.site',
    'https://ateworld.site',
    'https://www.ateworld.site',
  ];
  app.use(
    cors({
      credentials: true,
      origin: function (origin, cb) {
        if (whitelist.indexOf(origin as string) !== -1) {
          cb(null, true);
        } else {
          cb(new Error('Not allowed by CORS'));
        }
      },
    }),
  );

  // knexdb('tokens').del();

  // TODO: Health Check

  app.use('/api', mediaRouter);
  app.use('/api', authRouter);
  app.use('/api', userRouter);
  app.use('/api', postRouter);
  app.use('/api', likeRouter);
  app.use('/api', commentRouter);
  app.use('/api', chatsRouter);

  // error handling
  app.use(ErrorMiddleware);

  // app.use('/', expressStatic(path.resolve('../client/build/')));
};
