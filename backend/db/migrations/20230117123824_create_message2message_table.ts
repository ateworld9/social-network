import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('message2message', (table) => {
    table
      .integer('messageId')
      .references('messages.messageId')
      .onDelete('SET NULL');
    table
      .integer('forwardedMessageId')
      .references('messages.messageId')
      .onDelete('SET NULL');
    table.primary(['messageId', 'forwardedMessageId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('message2message');
}
