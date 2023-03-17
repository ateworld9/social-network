import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('likes', (table) => {
    table.increments('likeId');
    table.integer('userId').references('users.userId').onDelete('SET NULL');
    table.integer('postId').references('posts.postId').onDelete('SET NULL');
    table
      .integer('commentId')
      .references('comments.commentId')
      .onDelete('SET NULL');
    table.timestamps(false, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  // drop constraints ??
  return knex.schema.dropTable('likes');
}
