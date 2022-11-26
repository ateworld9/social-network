import './rightbar.scss';
import noAvatar from '../../assets/noAvatar.png';



export const RightBar = () => {
  return (
    <aside className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button className="follow">follow</button>
              <button className="dismiss">dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Last Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={noAvatar} alt="noAvatar" />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightBar;
