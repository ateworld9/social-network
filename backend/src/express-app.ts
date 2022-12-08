import {Application, Request, Response} from 'express';
import expressPinoLogger from 'express-pino-logger';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import logger from './utils/logger';
import ErrorMiddleware from './middleware/error';
import userRouter from './PresentationLayer/user.route';

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
  app.use(cors());

  userRouter(app);

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      response: 'successfull',
      data: {
        answer: 'Hello, World!',
      },
    });
  });

  // error handling
  app.use(ErrorMiddleware);
};
