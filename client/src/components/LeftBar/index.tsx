import './leftbar.scss';

import Friends from '../../assets/1.png';
import Messages from '../../assets/10.png';
import Tutorials from '../../assets/11.png';
import Courses from '../../assets/12.png';
import Fund from '../../assets/13.png';
import Groups from '../../assets/2.png';
import Marketplace from '../../assets/3.png';
import Watch from '../../assets/4.png';
import Memories from '../../assets/5.png';
import Events from '../../assets/6.png';
import Gaming from '../../assets/7.png';
import Gallery from '../../assets/8.png';
import Videos from '../../assets/9.png';
import noAvatar from '../../assets/noAvatar.png';

export const LeftBar = () => {
  return (
    <aside className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={noAvatar} alt="avatar" />
            <span>John Doe</span>
          </div>
          <div className="item">
            <img src={Friends} alt="Friends Icon" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="Groups Icon" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Marketplace} alt="Marketplace Icon" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="Watch Icon" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="Memories Icon" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="Events Icon" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="Gaming Icon" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="Gallery Icon" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="Videos Icon" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="Messages Icon" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Tutorials} alt="Tutorials Icon" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="Courses Icon" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={Fund} alt="Fund Icon" />
            <span>Fund</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftBar;
