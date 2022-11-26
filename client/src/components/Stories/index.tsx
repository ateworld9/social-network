import './stories.scss';

import {FC} from 'react';

export type StoryType = {
  id: number;
  name: string;
  img: string;
};

export type StoriesProps = {
  stories?: StoryType[];
};

export const Stories: FC<StoriesProps> = ({stories}) => {
  return (
    <div className="stories">
      <div className="story">
        <img src="https://picsum.photos/1500" alt="" />
        <span>John Doe</span>
        <button>+</button>
      </div>
      {stories
        ? stories.map((story: StoryType) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="story" />
              <span>{story.name}</span>
            </div>
          ))
        : 'loading skeleton'}
    </div>
  );
};

export default Stories;
