import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comments', (table) => {
    table.increments('commentId');
    table.integer('postId').references('posts.postId').onDelete('SET NULL');
    table.integer('userId').references('users.userId').onDelete('SET NULL');
    table.text('text').notNullable();
    table.enu('status', ['created', 'edited', 'deleted']).defaultTo('created');
    table.timestamps(false, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  // drop constraints ??
  return knex.schema.dropTable('comments');
}
