import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('message2media', (table) => {
    table
      .integer('messageId')
      .references('messages.messageId')
      .onDelete('SET NULL');
    table.integer('mediaId').references('media.mediaId').onDelete('SET NULL');
    table.primary(['messageId', 'mediaId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('message2media');
}
