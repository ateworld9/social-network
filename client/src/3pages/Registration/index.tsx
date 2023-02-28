import s from "./registration.module.css";

import RegistrationForm from "./RegistrationForm";

const Registration = () => {
  return (
    <div className={s.registration}>
      <div className={s.card}>
        <div className={s.left}>
          <h1>Registration</h1>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Registration;
