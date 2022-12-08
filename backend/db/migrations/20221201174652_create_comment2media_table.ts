import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comment2media', (table) => {
    table
      .integer('commentId')
      .references('comments.commentId')
      .onDelete('SET NULL');
    table.integer('mediaId').references('media.mediaId').onDelete('SET NULL');
    table.primary(['commentId', 'mediaId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('comment2media');
}
