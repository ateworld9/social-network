import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('media', (table) => {
    table.integer('postId').references('posts.postId').onDelete('SET NULL');
    table
      .integer('commentId')
      .references('comments.commentId')
      .onDelete('SET NULL');
    table
      .integer('messageId')
      .references('messages.messageId')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('media', (table) => {
    table.dropColumn('postId');
    table.dropColumn('commentId');
    table.dropColumn('messageId');
  });
}
