import './registration.scss';

import {Link} from 'react-router-dom';

export const Registration = () => {
  return (
    <div className="registration">
      <div className="card">
        <div className="left">
          <h1>Registration</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="password" />
            <button>Registration</button>
          </form>
        </div>
        <div className="right">
          <h1>Hello World!</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur, maxime corrupti magni hic illum aspernatur
            exercitationem similique architecto cupiditate.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
