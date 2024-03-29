import cn from "classnames";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import LinearProgress from "@mui/material/LinearProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";

import { fetchRegistration, cleanAuthError } from "@entities/auth";

import s from "./registrationForm.module.css";

interface IRegistrationForm {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(cleanAuthError());
    };
  }, [dispatch]);

  const { error, isLoading } = useTypedSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>({ mode: "onChange" });

  const onRegistrationSubmit = (data: IRegistrationForm) => {
    dispatch(fetchRegistration(data));
    // navigate("/");
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onRegistrationSubmit)}>
      <label htmlFor="username">
        <input
          id="username"
          className={cn(s.input, errors.username && s.inputError)}
          {...register("username", {
            minLength: { value: 4, message: "Minimum 4 symbols" },
          })}
          type="text"
          placeholder="Username"
        />
      </label>
      {errors.username && (
        <p role="alert" className={s.error}>
          {errors.username.message}
        </p>
      )}

      {/* <label htmlFor="name">
        <input
          id="name"
          {...register("name")}
          className={cn(s.input, errors.name && s.inputError)}
          type="text"
          placeholder="Name"
        />
      </label>
      {errors.name && (
        <p role="alert" className={s.error}>
          {errors.name.message}
        </p>
      )}
      <label htmlFor="surname">
        <input
          id="surname"
          {...register("surname")}
          className={cn(s.input, errors.name && s.inputError)}
          type="text"
          placeholder="Surname"
        />
      </label>
      {errors.surname && (
        <p role="alert" className={s.error}>
          {errors.surname.message}
        </p>
      )} */}

      {/* <label htmlFor="email">
        <input
          id="email"
          className={cn(s.input, errors.email && s.inputError)}
          {...register("email", {
            pattern: {
              value:
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
              message: "Invalid Email",
            },
          })}
          type="email"
          placeholder="Email"
        />
      </label>
      {errors.email && (
        <p role="alert" className={s.error}>
          {errors.email.message}
        </p>
      )} */}

      <label htmlFor="password">
        <input
          id="password"
          className={cn(
            s.input,
            (errors.password && s.inputError) ||
              (isLoading && s.inputError) ||
              (error && s.inputError),
          )}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          placeholder="password"
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
        Registration
      </button>

      <Link to="/login" className={s.loginButton}>
        <button type="button">Login</button>
      </Link>
    </form>
  );
};

export default RegistrationForm;
