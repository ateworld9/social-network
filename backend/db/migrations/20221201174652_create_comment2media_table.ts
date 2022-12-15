import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comment2media', (table) => {
    table
      .integer('commentId')
      .references('comments.commentId')
      .onDelete('CASCADE');
    table.integer('mediaId').references('media.mediaId').onDelete('CASCADE');
    table.primary(['commentId', 'mediaId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('comment2media');
}
