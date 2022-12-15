import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', (table) => {
    table.increments('postId');
    table.integer('userId').references('users.userId').onDelete('SET NULL');
    table.text('text').notNullable();
    table
      .enu('status', ['created', 'edited', 'invisible', 'deleted'])
      .defaultTo('created');
    table.timestamps(false, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts');
}
