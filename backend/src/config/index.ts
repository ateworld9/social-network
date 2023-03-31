import logger from '../logger';
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

const PATH_TO_PUBLIC =
  process.env.PATH_TO_PUBLIC ?? path.join(process.cwd(), '/public');
const PATH_TO_IMAGES =
  process.env.PATH_TO_IMAGES ?? path.join(PATH_TO_PUBLIC, '/images');

const APP_ACCESS_SECRET = process.env['APP_ACCESS_SECRET'];
if (!APP_ACCESS_SECRET) {
  logger.error('No client secret. Set APP_ACCESS_SECRET env variable.');
  process.exit(1);
}
const APP_REFRESH_SECRET = process.env['APP_REFRESH_SECRET'];
if (!APP_ACCESS_SECRET) {
  logger.error('No client secret. Set APP_REFRESH_SECRET env variable.');
  process.exit(1);
}
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  logger.error('No database connection string. Set DATABASE_URL env variable.');
  process.exit(1);
}
const dbConfig = parseDbUrl(DATABASE_URL);
const {user, password, host, port, database} = dbConfig;

const poolMin = process.env.DATABASE_POOL_MIN || '0';
if (poolMin === undefined) {
  logger.info(
    'No database pool min string. DATABASE_POOL_MIN env variable is set to default = 0.',
  );
}
const poolMax = Number(process.env.DATABASE_POOL_MAX || '10');
if (!poolMax) {
  logger.info(
    'No database pool max string. DATABASE_POOL_MAX env variable is set to default = 10.',
  );
}
const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000');
if (!poolIdle) {
  logger.info(
    'No database pool idle string. DATABASE_POOL_IDLE env variable is set to default = 10000.',
  );
}

const DB_CONFIG = {
  user,
  password,
  host,
  port,
  database,
  poolMin,
  poolMax,
  poolIdle,
};

const config = {
  PORT: Number(process.env.PORT ?? 3000),
  ENVIRONMENT: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  PATH_TO_PUBLIC,
  PATH_TO_IMAGES,

  APP_ACCESS_SECRET,
  APP_REFRESH_SECRET,

  DATABASE_URL,
  DB_CONFIG,
};

export default config;
