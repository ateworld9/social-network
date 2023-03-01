import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import LinearProgress from "@mui/material/LinearProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";

import { fetchLogin } from "@entities/auth";

import s from "./loginForm.module.css";

interface ILoginForm {
  username: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: "onChange" });

  const { error, isLoading } = useTypedSelector((state) => state.auth);

  const onLoginSubmit = async (data: ILoginForm) => {
    await dispatch(fetchLogin(data));
    navigate("/");
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onLoginSubmit)}>
      <label htmlFor="username">
        Username:
        <input
          id="username"
          className={cn(s.input, errors.username && s.inputError)}
          {...register("username", { required: "Username is required" })}
          type="text"
          placeholder="Username"
        />
      </label>
      {errors.username && (
        <p role="alert" className={s.error}>
          {errors.username.message}
        </p>
      )}

      <label htmlFor="password">
        Password:
        <input
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className={cn(
            s.input,
            (errors.password && s.inputError) ||
              (isLoading && s.inputError) ||
              (error && s.inputError),
          )}
        />
      </label>
      {errors.password && (
        <p role="alert" className={s.error}>
          {errors.password.message}
        </p>
      )}

      {isLoading && (
        <div className={s.loading}>
          <LinearProgress />
        </div>
      )}

      {error && (
        <p role="alert" className={s.error}>
          <ErrorOutlineIcon sx={{ fontSize: "10px", mr: "4px" }} />
          <span>{error}</span>
        </p>
      )}
      <button className={s.button} type="submit">
        Login
      </button>

      <Link to="/registration" className={s.registrationButton}>
        <button type="button">Registration</button>
      </Link>
    </form>
  );
};
export default LoginForm;
