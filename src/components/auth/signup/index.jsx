import React from "react";
import { Link } from "react-router-dom";
import FormInput from "../form-input/form-input";

const SignupPage = (props) => {
  const {inputs, values, onChangeValue, handleSubmit} = {...props};

return (
<div className="auth__registration form">
<header>Signup</header>
<form action="#">
        {/* <input type="text" placeholder="Enter your email"/>
        <input type="password" placeholder="Create a password"/>
        <input type="password" placeholder="Confirm your password"/> */}
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChangeValue}
          />
        ))}
         <input onClick={event=>handleSubmit(event, values.useremail, values.userpassword)} type="button" class="button" value="Signup" />
      </form>
      <div className="signup">
        <span className="signup">Already have an account?</span>
        <Link to={'/login'}>Login</Link>
      </div>
</div>
  );
};

export default SignupPage;
