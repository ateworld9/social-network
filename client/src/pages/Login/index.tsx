import {
  Link,
  //  useNavigate
} from "react-router-dom";

import s from "./login.module.css";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className={s.login}>
      <div className={s.card}>
        <div className={s.left}>
          <h1 className={s.header}>Hello World!</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur, maxime corrupti magni hic illum aspernatur
            exercitationem similique architecto cupiditate.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/registration">
            <button type="button">Registration</button>
          </Link>
        </div>
        <div className={s.right}>
          <h1>Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
