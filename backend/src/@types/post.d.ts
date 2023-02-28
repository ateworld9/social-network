// export enum PostStatus {
//   created = 'created',
//   edited = 'edited',
//   invisible = 'invisible',
//   deleted = 'deleted',
//   archived = 'archived',
// }

declare interface Post {
  postId: number;
  userId: UserId | null;
  text: string;
  status: 'created' | 'edited' | 'invisible' | 'deleted' | 'archived';
  createdAt: Date | string;
  updatedAt: Date | string;
}

declare type PostId = Post['postId'];

declare type PostTempExt = Post & {
  username: string;
  profilePic?: string | null; //TODO: make it mediaId
  comments?: CommentExt[]; //TODO: make it commentId
};

declare type PostExt = Post & {
  username: string;
  profilePic?: string | null; //TODO: make it mediaId
  media?: Array<{
    mediaPath?: string;
    mediaName?: string;
  }>; //TODO: make it mediaId[]
  comments?: CommentExt[];
};
