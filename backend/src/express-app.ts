import {Application, static as expressStatic} from 'express';
import expressPinoLogger from 'express-pino-logger';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import logger from './utils/logger';
import ErrorMiddleware from './middleware/error';

import mediaRouter from './PresentationLayer/media/route';
import authRouter from './PresentationLayer/auth/route';
import userRouter from './PresentationLayer/users/route';
import postRouter from './PresentationLayer/posts/route';
import commentRouter from './PresentationLayer/comments/route';
import chatsRouter from './PresentationLayer/chats/route';
import path from 'path';

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
  app.use('/api', commentRouter);
  app.use('/api', chatsRouter);

  // error handling
  app.use(ErrorMiddleware);

  // app.use('/', expressStatic(path.resolve('../client/build/')));
};
