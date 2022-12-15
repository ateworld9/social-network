import { Link } from "react-router-dom";

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
        <div className={s.right}>
          <h1>Hello World!</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur, maxime corrupti magni hic illum aspernatur
            exercitationem similique architecto cupiditate.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
