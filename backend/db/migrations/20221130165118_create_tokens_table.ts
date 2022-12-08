import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tokens', (table) => {
    table.integer('userId').references('users.userId').onDelete('SET NULL');
    table.string('refreshToken', 255).notNullable().primary();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tokens');
}
