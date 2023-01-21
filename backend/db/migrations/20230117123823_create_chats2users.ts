import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('chats2users', (table) => {
    table
      .integer('chatId')
      .notNullable()
      .references('chats.chatId')
      .onDelete('CASCADE');
    table
      .integer('userId')
      .notNullable()
      .references('users.userId')
      .onDelete('CASCADE');
    table.string('role');
    table.primary(['chatId', 'userId'], {
      constraintName: 'chats2users_primary_key',
      deferrable: 'deferred',
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('chats2users');
}
