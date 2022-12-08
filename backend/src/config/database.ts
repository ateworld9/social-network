import Knex from 'knex';
import logger from '../utils/logger';

import {
  user,
  password,
  host,
  port,
  database,
  poolMin,
  poolMax,
  poolIdle,
} from './index';

const knexdb = Knex({
  client: 'pg',
  connection: {
    user: user,
    password: password,
    host: host,
    port: Number(port),
    database: database,
  },
  pool: {
    min: Number(poolMin),
    max: poolMax,
    idleTimeoutMillis: poolIdle,
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
