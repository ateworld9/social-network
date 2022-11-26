import './comments.scss';

import {FC} from 'react';

const comments = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    userId: 1,
    name: 'John Doe',
    profilePic: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, tenetur.',
    userId: 1,
    name: 'John Doe',
    profilePic: 'https://picsum.photos/200/300',
  },
];

export const Comments: FC = () => {
  return (
    <div className="comments">
      {comments &&
        comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.profilePic} alt="avatar" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.text}</p>
            </div>
            <span className="date">1 hour ago</span>
          </div>
        ))}
    </div>
  );
};

export default Comments;
