import s from "./rightbar.module.css";

const RightBar = () => {
  return (
    <aside className={s.rightBar}>
      <div className={s.container}>
        <div className={s.item}>
          <span>Suggestions For You</span>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <span>Jane Doe</span>
            </div>
            <div className={s.buttons}>
              <button type="button" className={s.follow}>
                follow
              </button>
              <button type="button" className={s.dismiss}>
                dismiss
              </button>
            </div>
          </div>
        </div>
        <div className={s.item}>
          <span>Last Activities</span>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span className={s.time}>1 min ago</span>
          </div>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span className={s.time}>1 min ago</span>
          </div>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span className={s.time}>1 min ago</span>
          </div>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span className={s.time}>1 min ago</span>
          </div>
        </div>

        <div className={s.item}>
          <span>Online Contacts</span>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <div className={s.online} />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <div className={s.online} />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <div className={s.online} />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <div className={s.online} />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <div className={s.online} />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className={s.user}>
            <div className={s.userInfo}>
              <img src="/assets/noAvatar.png" alt="noAvatar" />
              <div className={s.online} />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightBar;
