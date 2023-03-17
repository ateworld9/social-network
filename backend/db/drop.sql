alter table media {
	drop column postId;
	drop column commentId;
	drop column messageId;
}
drop table posts2message;
drop table message2message;
drop table messages;

drop table chats2users
drop table chats
drop table contacts;

drop table likes;
drop table comments;
drop table posts;
drop table tokens;
drop table users;
drop table media;
drop table knex_migrations;
drop table knex_migrations_lock;

