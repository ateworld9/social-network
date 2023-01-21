import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('chats', (table) => {
    table.increments('chatId');
    table.string('chatName');
    table.enu('type', ['dialog', 'conference']).defaultTo('dialog');
    table.timestamps(false, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('chats');
}
