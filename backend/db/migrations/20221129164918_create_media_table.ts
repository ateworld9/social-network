import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('media', (table) => {
    table.increments('mediaId');
    table.text('filename').unique().notNullable();
    table.text('filepath').notNullable();
    table.text('mimetype').notNullable();
    table.bigint('size').defaultTo(null);

    // table.integer('messageId');
    // table.integer('postId');
    // table.integer('commentId');

    table.timestamps(false, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('media');
}
