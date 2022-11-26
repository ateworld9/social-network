import './home.scss';

import Posts from '@components/Posts';
import Stories from '@components/Stories';

const stories = [
  {id: 2, name: 'Jane Doe', img: 'https://picsum.photos/1500/1500'},
  {id: 3, name: 'Jane Doe', img: 'https://picsum.photos/1500/1500'},
  {id: 4, name: 'Jane Doe', img: 'https://picsum.photos/1500/1500'},
  {id: 5, name: 'Jane Doe', img: 'https://picsum.photos/1500/1500'},
];

export function Home() {
  return (
    <div className="home">
      <Stories stories={stories} />
      <Posts />
    </div>
  );
}

export default Home;
