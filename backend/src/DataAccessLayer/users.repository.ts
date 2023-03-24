import knexdb from '../config/database';

import {TABLES} from './constants';
import {parseSort} from './utils';

const DEFAULT_USER_SELECT = [
  `${TABLES.USERS}.userId as userId `,
  `${TABLES.USERS}.username as username `,
  `${TABLES.USERS}.role as role `,

  `${TABLES.USERS}.email as email `,
  `${TABLES.USERS}.phone as phone `,

  `${TABLES.USERS}.name as name `,
  `${TABLES.USERS}.surname as surname `,
  `avatars.filename as avatar `,
  `covers.filename as cover `,
  `${TABLES.USERS}.about as about `,
  `${TABLES.USERS}.city as city `,
  `${TABLES.USERS}.birthday as birthday `,

  `${TABLES.USERS}.createdAt as createdAt `,
  `${TABLES.USERS}.updatedAt as updatedAt `,
];

class UsersRepository {
  async createUser(fields: Partial<User>) {
    const result = await knexdb(TABLES.USERS).insert(fields).returning('*');
    return result[0];
  }

  async findUser({
    filter,
    withPassword,
  }: {
    filter: Partial<User> | undefined;
    withPassword?: boolean;
  }) {
    if (withPassword)
      DEFAULT_USER_SELECT.push(`${TABLES.USERS}.password as password`);

    const user: User & Media = await knexdb(TABLES.USERS)
      .first(DEFAULT_USER_SELECT)
      .leftJoin(
        knexdb(TABLES.MEDIA)
          .distinctOn('avatar')
          .select('*')
          .orderBy([
            {column: `${TABLES.MEDIA}.avatar`},
            {column: `${TABLES.MEDIA}.createdAt`, order: 'desc'},
          ])
          .as('avatars'),
        `${TABLES.USERS}.userId`,
        `avatars.avatar`,
      )
      .leftJoin(
        knexdb(TABLES.MEDIA)
          .distinctOn('cover')
          .select('*')
          .orderBy([
            {column: `${TABLES.MEDIA}.cover`},
            {column: `${TABLES.MEDIA}.createdAt`, order: 'desc'},
          ])
          .as('covers'),
        `${TABLES.USERS}.userId`,
        `covers.cover`,
      )
      .modify(function (queryBuilder) {
        if (filter) {
          queryBuilder.where(filter);
        }
      });

    return user;
  }

  async findUsers({
    sort,
    page,
    filter,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<User>;
  }) {
    const users: Array<User & Media> = await knexdb(TABLES.USERS)
      .select(DEFAULT_USER_SELECT)
      .leftJoin(
        knexdb(TABLES.MEDIA)
          .distinctOn('avatar')
          .select('*')
          .orderBy([
            {column: `${TABLES.MEDIA}.avatar`},
            {column: `${TABLES.MEDIA}.createdAt`, order: 'desc'},
          ])
          .as('avatars'),
        `${TABLES.USERS}.userId`,
        `avatars.avatar`,
      )
      .leftJoin(
        knexdb(TABLES.MEDIA)
          .distinctOn('cover')
          .select('*')
          .orderBy([
            {column: `${TABLES.MEDIA}.cover`},
            {column: `${TABLES.MEDIA}.createdAt`, order: 'desc'},
          ])
          .as('covers'),
        `${TABLES.USERS}.userId`,
        `covers.cover`,
      )
      .modify(function (queryBuilder) {
        if (sort) {
          queryBuilder.clear('order');
          queryBuilder.orderBy(parseSort(sort));
        }
        queryBuilder.limit(Number(page?.limit ?? 100));
        if (page?.offset) {
          queryBuilder.offset(+page.offset);
        }
        if (filter) {
          if (filter instanceof Array) {
            filter.forEach((el) => {
              queryBuilder.orWhere(el.columnName, el.operator, el.value);
            });
          } else {
            queryBuilder.where(filter);
          }
        }
      });

    return users;
  }

  async getCount(filter?: Filter<User>) {
    const count = knexdb(TABLES.USERS)
      .count('userId')
      .modify(function (queryBuilder) {
        if (filter) {
          if (filter instanceof Array) {
            filter.forEach((el) => {
              queryBuilder.orWhere(el.columnName, el.operator, el.value);
            });
          } else {
            queryBuilder.where(filter);
          }
        }
      });

    return count;
  }

  async updateUser(userId: UserId, fields: Partial<User>) {
    const result = await knexdb(TABLES.USERS)
      .where({userId})
      .update({...fields, updatedAt: new Date()})
      .returning('*');

    const updatedUser = await knexdb(TABLES.USERS)
      .select(DEFAULT_USER_SELECT)
      .leftJoin(
        knexdb(TABLES.MEDIA)
          .distinctOn('avatar')
          .select('*')
          .orderBy([
            {column: `${TABLES.MEDIA}.avatar`},
            {column: `${TABLES.MEDIA}.createdAt`, order: 'desc'},
          ])
          .as('avatars'),
        `${TABLES.USERS}.userId`,
        `avatars.avatar`,
      )
      .leftJoin(
        knexdb(TABLES.MEDIA)
          .distinctOn('cover')
          .select('*')
          .orderBy([
            {column: `${TABLES.MEDIA}.cover`},
            {column: `${TABLES.MEDIA}.createdAt`, order: 'desc'},
          ])
          .as('covers'),
        `${TABLES.USERS}.userId`,
        `covers.cover`,
      )
      .where({userId});
    return updatedUser[0];
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async findContactsByUserId(userId: UserId) {
    const contacts: Array<User & Media> = await knexdb(TABLES.CONTACTS)
      .select(DEFAULT_USER_SELECT)
      .leftJoin(
        TABLES.USERS,
        `${TABLES.USERS}.userId`,
        '=',
        `${TABLES.CONTACTS}.userId2`,
      )
      .leftJoin(
        knexdb(TABLES.MEDIA)
          .distinctOn('avatar')
          .select('*')
          .orderBy([
            {column: `${TABLES.MEDIA}.avatar`},
            {column: `${TABLES.MEDIA}.createdAt`, order: 'desc'},
          ])
          .as('avatars'),
        `${TABLES.USERS}.userId`,
        `avatars.avatar`,
      )
      .leftJoin(
        knexdb(TABLES.MEDIA)
          .distinctOn('cover')
          .select('*')
          .orderBy([
            {column: `${TABLES.MEDIA}.cover`},
            {column: `${TABLES.MEDIA}.createdAt`, order: 'desc'},
          ])
          .as('covers'),
        `${TABLES.USERS}.userId`,
        `covers.cover`,
      )
      .where({userId1: String(userId)});

    return contacts;
  }

  async addNewContact(userId1: number, userId2: number, status?: string) {
    await knexdb(TABLES.CONTACTS).insert([
      {
        userId1,
        userId2,
        status,
      },
    ]);
  }
}

export default UsersRepository;
