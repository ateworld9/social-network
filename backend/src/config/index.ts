import logger from '../utils/logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({path: '.env'});
} else {
  logger.debug(
    'Using .env.example file to supply config environment variables',
  );
  dotenv.config({path: '.env.example'}); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'development'

export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const DB_URL = prod
  ? process.env['DB_URL']
  : process.env['DB_URL_LOCAL'];

export const PORT = process.env['PORT'];

if (!SESSION_SECRET) {
  logger.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

if (!DB_URL) {
  if (prod) {
    logger.error(
      'No database connection string. Set DB_URL environment variable.',
    );
  } else {
    logger.error(
      'No database connection string. Set DB_URL_LOCAL environment variable.',
    );
  }
  process.exit(1);
}

// import dotenv from 'dotenv';

// if (process.env.NODE_ENV !== 'production') {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotenv.config({path: configFile});
// } else {
//   dotenv.config();
// }

// export default {
//   PORT: process.env.PORT,
//   DB_URL: process.env.MONGODB_URI,
//   APP_SECRET: process.env.APP_SECRET,
// };
