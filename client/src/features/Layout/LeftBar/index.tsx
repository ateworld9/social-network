import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/store";
import s from "./leftbar.module.css";

const LeftBar = () => {
  const user = useTypedSelector((state) => state.auth.user);
  return (
    <aside className={s.leftBar}>
      <div className={s.container}>
        <div className={s.menu}>
          <div className={s.user}>
            <img
              src={user?.profilePic ?? "/assets/noAvatar.png"}
              alt="avatar"
            />
            <span>{user?.username}</span>
          </div>
          <Link to="/contacts">
            <div className={s.item}>
              <img src="/assets/1.png" alt="Contacts Icon" />
              <span>Contacts</span>
            </div>
          </Link>
          <div className={s.item}>
            <img src="/assets/2.png" alt="Groups Icon" />
            <span>Groups</span>
          </div>
          <div className={s.item}>
            <img src="/assets/3.png" alt="Marketplace Icon" />
            <span>Marketplace</span>
          </div>
          <div className={s.item}>
            <img src="/assets/4.png" alt="Watch Icon" />
            <span>Watch</span>
          </div>
          <div className={s.item}>
            <img src="/assets/5.png" alt="Memories Icon" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className={s.menu}>
          <span>Your shortcuts</span>
          <div className={s.item}>
            <img src="/assets/6.png" alt="Events Icon" />
            <span>Events</span>
          </div>
          <div className={s.item}>
            <img src="/assets/7.png" alt="Gaming Icon" />
            <span>Gaming</span>
          </div>
          <div className={s.item}>
            <img src="/assets/8.png" alt="Gallery Icon" />
            <span>Gallery</span>
          </div>
          <div className={s.item}>
            <img src="/assets/9.png" alt="Videos Icon" />
            <span>Videos</span>
          </div>
          <div className={s.item}>
            <img src="/assets/10.png" alt="Messages Icon" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className={s.menu}>
          <span>Others</span>
          <div className={s.item}>
            <img src="/assets/11.png" alt="Tutorials Icon" />
            <span>Tutorials</span>
          </div>
          <div className={s.item}>
            <img src="/assets/12.png" alt="Courses Icon" />
            <span>Courses</span>
          </div>
          <div className={s.item}>
            <img src="/assets/13.png" alt="Fund Icon" />
            <span>Fund</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftBar;
