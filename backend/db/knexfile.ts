import type {Knex} from 'knex';
import appConfig from '../src/config';

const {DB_CONFIG} = appConfig;

const config: {[key: string]: Knex.Config} = {
  development: {
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
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  // staging: {
  //   client: 'pg',
  //   connection: {
  //     user: user,
  //     password: password,
  //     host: host,
  //     port: Number(port),
  //     database: database,
  //   },
  //   pool: {
  //     min: Number(poolMin),
  //     max: poolMax,
  //     idleTimeoutMillis: poolIdle,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },

  production: {
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
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
