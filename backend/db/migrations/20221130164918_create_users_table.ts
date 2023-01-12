import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('userId');
    table.string('email', 255).unique().notNullable();
    table
      .string('password', 255)
      .notNullable()
      .checkLength('>=', 8, 'password_length_check');

    table
      .string('phone', 255)
      .unique()
      .checkRegex('^[+][7][0-9]{10}', 'phone_check')
      .defaultTo(null);
    table.string('name', 255).defaultTo(null);
    table.string('surname', 255).defaultTo(null);
    table
      .integer('profilePic')
      .references('media.mediaId')
      .onDelete('SET NULL')
      .defaultTo(null);
    table.string('username', 255).notNullable().unique();

    table.boolean('isActivated').defaultTo(false);
    table.string('activationLink').defaultTo('');
    table.timestamps(false, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
