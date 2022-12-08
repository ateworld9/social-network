import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table) => {
    table.increments('messageId');
    table.integer('fromUserId').references('users.userId').onDelete('SET NULL');
    table.integer('toUserId').references('users.userId').onDelete('SET NULL');
    table.text('text').notNullable();
    table
      .enu('status', [
        'not-sended',
        'sended',
        'readed',
        'edited',
        'invisible',
        'deleted',
      ])
      .defaultTo('created');
    table.timestamps(false, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages');
}
