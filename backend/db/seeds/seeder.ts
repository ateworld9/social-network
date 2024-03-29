import {Knex} from 'knex';

import * as bcrypt from 'bcrypt';

// users_pkey

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('media').del();
  await knex('message2message').del();
  await knex('messages').del();
  await knex('chats2users').del();
  await knex('chats').del();
  await knex('contacts').del();
  await knex('likes').del();
  await knex('comments').del();
  await knex('posts').del();
  await knex('tokens').del();
  await knex('users').del();

  // Inserts seed entries

  await knex('users').insert([
    {
      email: 'admin@gmail.com',
      phone: '+79139761111',
      password: await bcrypt.hash('administrator', 3),
      name: 'admin',
      surname: 'adminov',
      username: 'admin',
      role: 'admin',
    },
    {
      email: 'vahrameev.work@gmail.com',
      phone: '+79150540020',
      password: await bcrypt.hash('password', 3),
      name: 'Dmitriy',
      surname: 'Vahrammev',
      username: 'ateworld9',
    },
    {
      email: '3@gmail.com',
      phone: null,
      password: await bcrypt.hash('12341234', 3),
      name: '',
      surname: '',
      username: 'nickname3',
    },
    {
      email: '4@gmail.com',
      phone: '+70000000004',
      password: await bcrypt.hash('12341234', 3),
      name: '',
      surname: '',
      username: 'nickname4',
    },
    {
      email: '5@gmail.com',
      phone: '+70000000005',
      password: await bcrypt.hash('12341234', 3),
      name: '',
      surname: '',
      username: 'nickname5',
    },
    {
      email: '6@gmail.com',
      phone: null,
      password: await bcrypt.hash('12341234', 3),
      name: '',
      surname: '',
      username: 'nickname6',
    },
    {
      email: 'test@gmail.com',
      phone: null,
      password: await bcrypt.hash('12341234', 3),
      name: '',
      surname: '',
      username: 'test',
    },
  ]);
  await knex('posts').insert([
    {userId: 1, text: 'Hello, World!'},
    {userId: 2, text: 'Welcome, to my social media'},
    {userId: 3, text: 'Lorem ipsum docole pipsun'},
  ]);

  await knex('comments').insert([
    {
      postId: 1,
      userId: 2,
      text: 'Hello, World!',
      status: 'created',
    },
    {
      postId: 1,
      userId: 2,
      text: 'Welcome, to my social media',
      status: 'created',
    },
    {
      postId: 1,
      userId: 2,
      text: 'Lorem ipsum docole pipsun',
      status: 'created',
    },
  ]);

  await knex('likes').insert([{userId: 2, postId: 1}]);

  await knex('chats').insert([
    {type: 'dialog'},
    {type: 'dialog'},
    {type: 'dialog'},
    {type: 'dialog'},
    {type: 'dialog'},
  ]);
  await knex('chats2users').insert([
    {
      chatId: 4,
      userId: 1,
      role: 'admin',
    },
    {
      chatId: 4,
      userId: 4,
      role: 'admin',
    },
    {
      chatId: 1,
      userId: 1,
      role: 'admin',
    },
    {
      chatId: 1,
      userId: 2,
      role: 'member',
    },
    {
      chatId: 2,
      userId: 2,
      role: 'member',
    },
    {
      chatId: 2,
      userId: 3,
      role: 'member',
    },

    {
      chatId: 3,
      userId: 2,
      role: 'member',
    },
    {
      chatId: 3,
      userId: 4,
      role: 'member',
    },
    {
      chatId: 4,
      userId: 2,
      role: 'member',
    },
    {
      chatId: 4,
      userId: 7,
      role: 'member',
    },
  ]);

  await knex('messages').insert([
    {
      chatId: 1,
      fromUserId: 1,
      text: 'Hello, World!',
      status: 'sended',
    },
    {
      chatId: 1,
      fromUserId: 2,
      text: 'Hi!',
      status: 'sended',
    },
    {
      fromUserId: 1,
      chatId: 1,
      text: 'How are you?',
      status: 'sended',
    },
    {
      fromUserId: 2,
      chatId: 1,
      text: 'Fine, thanks! and u?',
      status: 'sended',
    },
    {
      fromUserId: 2,
      chatId: 4,
      text: 'Hello! Welcome you on SocialWorld',
      status: 'sended',
    },
  ]);
  // await knex('message2message').insert([{messageId: 4, forwardedMessageId: 3}]);
  await knex('contacts').insert([
    {userId1: 2, userId2: 1},
    {userId1: 2, userId2: 3},
  ]);

  await knex('media').insert([
    {
      filepath: 'http://localhost:3001/public/images/2000x2000.jpg',
      filename: '2000x2000.jpg',
      mimetype: 'image/*',
      avatar: 1,
    },
    {
      filepath: 'http://localhost:3001/public/images/390-1600x1600.jpg',
      filename: '390-1600x1600.jpg',
      mimetype: 'image/*',
      postId: 1,
    },
    {
      filepath: 'http://localhost:3001/public/images/482-1400x1400.jpg',
      filename: '482-1400x1400.jpg',
      mimetype: 'image/*',
      postId: 2,
    },
    {
      filepath: 'http://localhost:3001/public/images/922-1500x1500.jpg',
      filename: '922-1500x1500.jpg',
      mimetype: 'image/*',
      postId: 3,
    },
    {
      filepath: 'http://localhost:3001/public/images/vahratar.jpg',
      filename: 'vahratar.jpg',
      mimetype: 'image/*',
      avatar: 2,
    },
  ]);
}
