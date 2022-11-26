import './posts.scss';

import Post from '@components/Post';
import {FC} from 'react';

const posts = [
  {
    id: 1,
    name: 'Jane Doe',
    userId: 1,
    profilePic: 'https://picsum.photos/200/300',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    img: 'https://picsum.photos/1499/1200',
  },
  {
    id: 2,
    name: 'Jane Doe',
    userId: 1,
    profilePic: 'https://picsum.photos/200/300',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, tenetur.',
    img: 'https://picsum.photos/1499/1100',
  },
  {
    id: 3,
    name: 'Jane Doe',
    userId: 1,
    profilePic: 'https://picsum.photos/200/300',
    text: 'Lorem ipsum dolor sit amet.',
    img: 'https://picsum.photos/1499/1400',
  },
  {
    id: 4,
    name: 'Jane Doe',
    userId: 1,
    profilePic: 'https://picsum.photos/200/300',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    img: 'https://picsum.photos/1499/1510',
  },
];

export const Posts: FC = () => {
  return (
    <div className="posts">
      {posts.length
        ? posts.map((post) => <Post {...post} key={post.id} />)
        : 'loading skeleton'}
    </div>
  );
};

export default Posts;
