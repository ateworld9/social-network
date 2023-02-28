import s from "./login.module.css";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className={s.login}>
      <div className={s.card}>
        <div className={s.right}>
          <h1>Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
