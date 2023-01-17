import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contacts', (table) => {
    table.integer('userId1').references('users.userId').onDelete('SET NULL');
    table.integer('userId2').references('users.userId').onDelete('SET NULL');
    table.primary(['userId1', 'userId2']);
    table.string('status', 225);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contacts');
}
