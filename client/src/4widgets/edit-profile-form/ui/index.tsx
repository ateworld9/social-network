import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";

import { useAppDispatch } from "@shared/hooks";

import { profileModel } from "@entities/profile";

import s from "./index.module.css";

type EditFormProps = {
  userId: UserId;
  username: User["username"];

  email: User["email"];
  phone: User["phone"];

  name: User["name"];
  surname: User["surname"];
  about: User["about"];
  city: User["city"];
  birthday: User["birthday"];
};

const EditForm = ({
  userId,
  username,
  email,
  phone,
  name,
  surname,
  about,
  birthday,
  city,
}: EditFormProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<Partial<User>>({
    defaultValues: {
      about,
      username,
      name,
      surname,
      email,
      phone,
      birthday,
      city,
    },
  });

  const onSubmit = (data) => {
    dispatch(profileModel.updateUserProfile({ userId, user: data }));
  };

  return (
    <section className={s.formSection}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="about"
          label=" About:"
          size="small"
          className={s.item}
          fullWidth
          multiline
          {...register("about")}
          type="text"
          placeholder="About"
          error={!!formState.errors.about?.message}
          helperText={
            formState.errors.about?.message
              ? formState.errors.about?.message
              : ""
          }
        />

        <TextField
          id="username"
          label="Username:"
          size="small"
          className={s.item}
          fullWidth
          {...register("username", {
            required: "Username is required",
          })}
          type="text"
          placeholder="Username"
          error={!!formState.errors.username?.message}
          helperText={
            formState.errors.username?.message
              ? formState.errors.username?.message
              : ""
          }
        />

        <TextField
          id="name"
          label="Name:"
          size="small"
          className={s.item}
          fullWidth
          {...register("name", {
            required: "Name is required",
          })}
          type="text"
          placeholder="Name"
          error={!!formState.errors.name?.message}
          helperText={
            formState.errors.name?.message ? formState.errors.name?.message : ""
          }
        />

        <TextField
          id="surname"
          label="Surname:"
          size="small"
          className={s.item}
          fullWidth
          {...register("surname", {
            required: "Surname is required",
          })}
          type="text"
          placeholder="Surname"
          error={!!formState.errors.surname?.message}
          helperText={
            formState.errors.surname?.message
              ? formState.errors.surname?.message
              : ""
          }
        />

        <TextField
          id="email"
          label="Email:"
          size="small"
          className={s.item}
          fullWidth
          {...register("email", {
            pattern: {
              value:
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
              message: "Invalid Email",
            },
          })}
          type="text"
          placeholder="example@gmail.com"
          error={!!formState.errors.email?.message}
          helperText={
            formState.errors.email?.message
              ? formState.errors.email?.message
              : ""
          }
        />

        <TextField
          id="phone"
          label="Phone:"
          size="small"
          className={s.item}
          fullWidth
          {...register("phone", {
            pattern: {
              value: /^[+][7][0-9]{10}/,
              message: "Invalid Phone",
            },
          })}
          type="text"
          placeholder="+79001230000"
          error={!!formState.errors.phone?.message}
          helperText={
            formState.errors.phone?.message
              ? formState.errors.phone?.message
              : ""
          }
        />
        {/* <DatePicker label="Birthday" name={name} /> */}
        <TextField
          id="city"
          label="City:"
          size="small"
          className={s.item}
          fullWidth
          {...register("city")}
          type="text"
          placeholder="City"
          error={!!formState.errors.city?.message}
          helperText={
            formState.errors.city?.message ? formState.errors.city?.message : ""
          }
        />
        <Button
          size="small"
          variant="contained"
          type="submit"
          className={s.submit}
        >
          Save
        </Button>
      </form>
    </section>
  );
};

export { EditForm };
