import {Application} from 'express';
import expressPinoLogger from 'express-pino-logger';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import {CLIENT_URL} from './config';
import logger from './utils/logger';
import ErrorMiddleware from './middleware/error';

import mediaRouter from './PresentationLayer/media/route';
import authRouter from './PresentationLayer/auth/route';
import userRouter from './PresentationLayer/users/route';
import postRouter from './PresentationLayer/posts/route';
import commentRouter from './PresentationLayer/comments/route';
import chatsRouter from './PresentationLayer/chats/route';

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
  app.use(cors({credentials: true, origin: CLIENT_URL}));

  // knexdb('tokens').del();

  // TODO: Health Check

  mediaRouter(app);
  authRouter(app);
  userRouter(app);
  postRouter(app);
  commentRouter(app);
  chatsRouter(app);

  // error handling
  app.use(ErrorMiddleware);
};
