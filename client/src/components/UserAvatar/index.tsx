import {avatar, name, user} from './user.module.scss';
import noAvatar from '../../assets/noAvatar.png';



export const userAvatar = () => {
  return (
    <div className={user}>
      <img className={avatar} src={noAvatar} alt="avatar" />
      <span className={name}>John Doe</span>
    </div>
  );
};
