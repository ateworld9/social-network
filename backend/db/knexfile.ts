import type {Knex} from 'knex';
import {
  user,
  password,
  host,
  port,
  database,
  poolMin,
  poolMax,
  poolIdle,
} from '../src/config';

// Update with your config settings.

const config: {[key: string]: Knex.Config} = {
  development: {
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
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
