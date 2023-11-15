import React from "react";
import { Link } from "react-router-dom";
import FormInput from "../form-input/form-input";

const LoginPage = (props) => {
const {inputs, values, onChangeValue, handleSubmit} = {...props};

  return (
    <div className="auth__login form">
        <header>Login</header>
        <form action="#">
            {/* <input {...userName} type="text" placeholder="Enter your email" />
            <input {...userPassword} type="password" placeholder="Enter your password" /> */}
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChangeValue}
          />
        ))}
            <input onClick={event=>handleSubmit(event, values.useremail, values.userpassword)} type="button" class="button" value="Login" />
        </form>
        <div className="signup">
        <span className="signup">Don't have an account?</span>
        <Link to={'/signup'}>Signup</Link>
      </div>   
    </div>
  );
};

export default LoginPage;
