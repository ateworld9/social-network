import express from 'express';
import {createServer} from 'http';
import {PORT} from './config';
import {checkDatabaseConnection} from './config/database';
import expressApp from './express-app';
import socketIoApp from './socket-io-app';

const port = PORT ?? 3000;

const StartServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  await checkDatabaseConnection();

  await expressApp(app);
  await socketIoApp(httpServer);

  httpServer
    .listen(port, () => {
      console.log(`listening to port ${port}`);
    })
    .on('error', (err: Error) => {
      console.log('Error', err);
      process.exit();
    });
};

StartServer();
