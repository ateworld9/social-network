declare type Include = string; // include=comments.author,ratings
declare type Fields = string; // fields[articles]=title,body&fields[people]=name
declare type Sort = string; // sort=-created,title                 -------------------------Partial<T> | `-${Partial<T>}`;
declare interface Page {
  limit?: number;
  offset?: number;
}
declare interface FilterWithOperatorObject {
  columnName: string;
  operator: '=' | '<' | '>' | '<>' | 'in' | 'like' | 'ilike';
  value: any;
}
declare type Filter<T> = Partial<T> | FilterWithOperatorObject[];

declare type ReqQuery<T> = {
  include?: Include;
  fields?: Fields;
  sort?: Sort;
  page?: Page;
  filter?: Filter<T>;
};

declare module 'knex/types/tables' {
  interface Tables {
    media: Media;
    media_composite: Knex.CompositeTableType<
      Media,
      Partial<Pick<Media, 'createdAt' | 'updatedAt'>>,
      Partial<Omit<Media, 'messageId'>>
    >;
    // This is same as specifying `knex<User>('users')`
    users: User;
    // For more advanced types, you can specify separate type
    // for base model, "insert" type and "update" type.
    // But first: notice that if you choose to use this,
    // the basic typing showed above can be ignored.
    // So, this is like specifying
    //    knex
    //    .insert<{ name: string }>({ name: 'name' })
    //    .into<{ name: string, id: number }>('users')
    users_composite: Knex.CompositeTableType<
      // This interface will be used for return type and
      // `where`, `having` etc where full type is required
      User,
      // Specifying "insert" type will also make sure
      // data matches interface in full. Meaning
      // if interface is `{ a: string, b: string }`,
      // `insert({ a: '' })` will complain about missing fields.
      //
      // For example, this will require only "name" field when inserting
      // and make createdAt and updatedAt optional.
      // And "id" can't be provided at all.
      // Defaults to "base" type.
      Pick<User, 'name'> & Partial<Pick<User, 'createdAt' | 'updatedAt'>>,
      // This interface is used for "update()" calls.
      // As opposed to regular specifying interface only once,
      // when specifying separate update interface, user will be
      // required to match it  exactly. So it's recommended to
      // provide partial interfaces for "update". Unless you want to always
      // require some field (e.g., `Partial<User> & { updatedAt: string }`
      // will allow updating any field for User but require updatedAt to be
      // always provided as well.
      //
      // For example, this wil allow updating all fields except "id".
      // "id" will still be usable for `where` clauses so
      //      knex('users_composite')
      //      .update({ name: 'name2' })
      //      .where('id', 10)`
      // will still work.
      // Defaults to Partial "insert" type
      Partial<Omit<User, 'userId'>>
    >;
    tokens: Token;
    posts: Post;
    posts_composite: Knex.CompositeTableType<
      Post,
      Partial<Pick<Post, 'createdAt' | 'updatedAt'>>,
      Partial<Omit<Post, 'postId'>>
    >;
    comments: Comment;
    comments_composite: Knex.CompositeTableType<
      Comment,
      Partial<Pick<Comment, 'createdAt' | 'updatedAt'>>,
      Partial<Omit<Comment, 'commentId'>>
    >;
    chats: Chat;
    chats_composite: Knex.CompositeTableType<
      Chat,
      Partial<Pick<Chat, 'createdAt' | 'updatedAt'>>,
      Partial<Omit<Chat, 'chatId'>>
    >;
    messages: Message;
    messages_composite: Knex.CompositeTableType<
      Message,
      Partial<Pick<Message, 'createdAt' | 'updatedAt'>>,
      Partial<Omit<Message, 'messageId'>>
    >;
  }
}

// type GetQuery = {

//   fields:
//   page: Page;
// };

// type ErrorObject = {
//   id: number | string;
//   status: STATUS_CODES;
//   code: string;
//   title: string;
//   detail: string;
//   source: {
//     pointer?: string;
//   };
// };

// type ResourseObject<T> = {
//   id: string | number;
//   type: string;
//   attributes: any;
//   relationships: {
//     links: {
//       self: string;
//       related: string;
//       // member?
//     };
//     data: {};
//     meta: {};
//   };
// };

// type ResBody = {
//   jsonapi?: {
//     version: string;
//   };
//   links?: {
//     self: string;
//     related: string;
//   };
//   meta: {
//     count: number;
//   };
//   data: any;
//   included: any;
//   errors?: ErrorObject[];
// };
