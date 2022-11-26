import express, {Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
// import {customer, products, shopping} from './api';
import HandleErrors from './utils/error-handler';

import expressPinoLogger from 'express-pino-logger';

import logger from './utils/logger';

export default async (app: Application) => {
  const loggerMidlleware = expressPinoLogger({
    logger: logger,
    autoLogging: true,
  });

  app.use(loggerMidlleware);

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());
  // app.use(express.static(__dirname + '/public'));

  //api
  // customer(app);
  // products(app);
  // shopping(app);
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      response: 'successfull',
      data: {
        answer: 'Hello, World!',
      },
    });
  });

  // error handling
  app.use(HandleErrors);
};
