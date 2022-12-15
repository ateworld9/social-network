import {Knex} from 'knex';

import * as bcrypt from 'bcrypt';

// users_pkey

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('message2message').del();
  await knex('message2media').del();
  await knex('comment2media').del();
  await knex('post2media').del();

  await knex('messages').del();
  await knex('comments').del();
  await knex('posts').del();
  await knex('users').del();
  await knex('media').del();

  // Inserts seed entries
  await knex('media').insert([
    {path: 'https://picsum.photos/200/200'},
    {path: 'https://picsum.photos/200/300'},
    {path: 'https://picsum.photos/300/300'},
    {path: 'https://picsum.photos/300/400'},
    {path: 'https://picsum.photos/400/400'},
    {path: 'https://picsum.photos/400/500'},
    {path: 'https://picsum.photos/500/500'},
  ]);
  await knex('users').insert([
    {
      email: 'admin@gmail.com',
      phone: '+79139762233',
      password: await bcrypt.hash('administrator', 3),
      name: 'admin',
      surname: 'adminov',
      profilePic: 1,
      username: 'admin',
    },
    {
      email: 'vahrameev.work@gmail.com',
      phone: '+79150540020',
      password: await bcrypt.hash('password', 3),
      name: 'Dmitriy',
      surname: 'Vahrammev',
      profilePic: 3,
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
  ]);
  await knex('posts').insert([
    {userId: 1, text: 'Hello, World!', status: 'created'},
    {
      userId: 2,
      text: 'Welcome, to my social media',
      status: 'created',
    },
    {
      userId: 3,
      text: 'Lorem ipsum docole pipsun',
      status: 'created',
    },
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

  await knex('messages').insert([
    {
      fromUserId: 1,
      toUserId: 2,
      text: 'Hello, World!',
      status: 'readed',
    },
    {
      fromUserId: 2,
      toUserId: 1,
      text: 'Hi!',
      status: 'readed',
    },
    {
      fromUserId: 1,
      toUserId: 2,
      text: 'How are you?',
      status: 'readed',
    },
    {
      fromUserId: 2,
      toUserId: 1,
      text: 'Fine, thanks! and u?',
      status: 'readed',
    },
  ]);

  await knex('post2media').insert([
    {postId: 1, mediaId: 1},
    {postId: 2, mediaId: 2},
    {postId: 3, mediaId: 3},
  ]);
  await knex('comment2media').insert([
    {commentId: 1, mediaId: 4},
    {commentId: 2, mediaId: 5},
    {commentId: 3, mediaId: 6},
  ]);
  await knex('message2media').insert([{messageId: 1, mediaId: 7}]);
  await knex('message2message').insert([{messageId: 4, forwardedMessageId: 3}]);
}
