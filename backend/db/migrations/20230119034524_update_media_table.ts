import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('media', (table) => {
    table.integer('postId').references('posts.postId').onDelete('CASCADE');
    table
      .integer('commentId')
      .references('comments.commentId')
      .onDelete('CASCADE');
    table
      .integer('messageId')
      .references('messages.messageId')
      .onDelete('CASCADE');
    table.integer('avatar').references('users.userId').onDelete('CASCADE');
    table.integer('cover').references('users.userId').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('media', (table) => {
    table.dropColumn('postId');
    table.dropColumn('commentId');
    table.dropColumn('messageId');
    table.dropColumn('avatar');
    table.dropColumn('cover');
  });
}
