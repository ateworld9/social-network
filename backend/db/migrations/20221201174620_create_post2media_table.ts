import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post2media', (table) => {
    table.integer('postId').references('posts.postId').onDelete('SET NULL');
    table.integer('mediaId').references('media.mediaId').onDelete('SET NULL');
    table.primary(['postId', 'mediaId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post2media');
}
