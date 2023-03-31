import Knex from 'knex';
import logger from '../logger';

import config from './index';

const {DB_CONFIG} = config;

const knexdb = Knex({
  client: 'pg',
  connection: {
    user: DB_CONFIG.user,
    password: DB_CONFIG.password,
    host: DB_CONFIG.host,
    port: Number(DB_CONFIG.port),
    database: DB_CONFIG.database,
  },
  pool: {
    min: Number(DB_CONFIG.poolMin),
    max: DB_CONFIG.poolMax,
    idleTimeoutMillis: DB_CONFIG.poolIdle,
  },
  acquireConnectionTimeout: 2000,
});

// Verify the connection before proceeding
export const checkDatabaseConnection = async () => {
  try {
    const testResp = await knexdb.raw('SELECT now()');
    logger.info(`Postgres connection is alive: ${testResp.rows[0].now}`);
  } catch (error) {
    throw new Error(
      'Unable to connect to Postgres via Knex. Ensure a valid connection.',
    );
  }
};

export default knexdb;
