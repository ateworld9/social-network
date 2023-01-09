import logger from '../utils/logger';
import dotenv from 'dotenv';
import fs from 'fs';
import parseDbUrl from 'ts-parse-database-url';
import path from 'path';

logger.debug(path.resolve(process.cwd(), '.env'));

if (fs.existsSync(path.resolve(process.cwd(), '.env'))) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({path: '.env'});
} else if (fs.existsSync(path.resolve(process.cwd(), '../.env'))) {
  logger.debug(
    'Using .env file to supply config environment variables FOR MIGRATION',
  );
  dotenv.config({path: '../.env'});
} else {
  logger.error('No .env file. Please create .env file');
}

export const PORT = Number(process.env.PORT || '8000');

export const PATH_TO_PUBLIC = path.join(process.cwd(), '/public');
export const PATH_TO_IMAGES = path.join(PATH_TO_PUBLIC, '/images');

export const CLIENT_URL = process.env['CLIENT_URL'];
if (!CLIENT_URL) {
  logger.error('No client url. Set CLIENT_URL env variable.');
  process.exit(1);
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const isProd = ENVIRONMENT === 'production';
export const APP_ACCESS_SECRET = process.env['APP_ACCESS_SECRET'];
if (!APP_ACCESS_SECRET) {
  logger.error('No client secret. Set APP_ACCESS_SECRET env variable.');
  process.exit(1);
}
export const APP_REFRESH_SECRET = process.env['APP_REFRESH_SECRET'];
if (!APP_ACCESS_SECRET) {
  logger.error('No client secret. Set APP_REFRESH_SECRET env variable.');
  process.exit(1);
}
export const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  logger.error('No database connection string. Set DATABASE_URL env variable.');
  process.exit(1);
}
export const config = parseDbUrl(DATABASE_URL);
export const {driver, user, password, host, port, database} = config;

export const poolMin = process.env.DATABASE_POOL_MIN || '0';
if (poolMin === undefined) {
  logger.info(
    'No database pool min string. DATABASE_POOL_MIN env variable is set to default = 0.',
  );
}
export const poolMax = Number(process.env.DATABASE_POOL_MAX || '10');
if (!poolMax) {
  logger.info(
    'No database pool max string. DATABASE_POOL_MAX env variable is set to default = 10.',
  );
}
export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000');
if (!poolIdle) {
  logger.info(
    'No database pool idle string. DATABASE_POOL_IDLE env variable is set to default = 10000.',
  );
}

export const KnexConfig = {
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOSTNAME || host,
    database: process.env.DATABASE_NAME || database,
    user: process.env.DATABASE_USERNAME || user,
    password: process.env.DATABASE_PASSWORD || password,
    port: process.env.DATABASE_PORT || port,
  },
  pool: {
    min: process.env.DATABASE_POOL_MIN,
    max: process.env.DATABASE_POOL_MAX,
    idle: process.env.DATABASE_POOL_IDLE,
  },
  migrations: {
    tableName: 'KnexMigrations',
  },
};

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
