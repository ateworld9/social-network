import express from 'express';
import {PORT} from './config';
import {checkDatabaseConnection} from './config/database';
import expressApp from './express-app';

const port = PORT ?? 3000;

const StartServer = async () => {
  const app = express();

  await checkDatabaseConnection();

  await expressApp(app);

  app
    .listen(port, () => {
      console.log(`listening to port ${port}`);
    })
    .on('error', (err: Error) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
