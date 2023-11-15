import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useInput} from '../../_hooks/use-input';
import LoginPage from "./login";
import SignupPage from "./signup";
import "./_style.scss";
import AuthService from '../../_services/auth.service'

const AuthRootComponent = (props) => {
  const [notificationHidden, setNotificationHidden] = React.useState(true);
  const [notificationText, setNotificationText] = React.useState("");
  const {setUser} = {...props};
  const navigate = useNavigate();
  const loacation = useLocation();
  
  const loginValues =useInput({
    useremail: "",
    userpassword: "",
  });
  const signupValues= useInput({
    useremail: "",
    userpassword: "",
    confirmPassword: "",
  });

  const SignupInputs=[
    {
      id: 1,
      name: "useremail",
      type: "text",
      placeholder:"Enter your email",
      errorMessage:
        "It should be a valid email address!",
      pattern:"[^@\\s]+@[^@\\s]+\\.[^@\\s]+",
      required: true,
    },
    {
      id: 2,
      name: "userpassword",
      type: "password",
      placeholder: "Enter your password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: signupValues.values.userpassword,
      required: true,
    },
  ]
  const LoginInputs=[
    {
      id: 1,
      name: "useremail",
      type: "text",
      placeholder:"Enter your email",
      errorMessage:
        "It should be a valid email address!",
        pattern:"[^@\\s]+@[^@\\s]+\\.[^@\\s]+",
      required: true,
    },
    {
      id: 2,
      name: "userpassword",
      type: "password",
      placeholder: "Enter your password",
      errorMessage:
        "The field must not be empty",
      required: true,
    }
  ]
  const handleFormSubmit = async  (e, useremail, userpassword) => {
    e.preventDefault();
    setNotificationHidden(true);
     if (document.querySelector('input:invalid')) {
        setNotificationText('Не все поля заполнены корректно!');
        setNotificationHidden(false);

     } else {
      try {
         loacation.pathname === "/login" ? 
         await AuthService.login({useremail, userpassword})
        :
        await AuthService.register({useremail, userpassword});
        setUser(AuthService.checkAutoLogin());
        navigate("/");
      } catch (error) {
        setNotificationText(error.errorMessage);
        setNotificationHidden(false);
      }
     }

  };

React.useEffect(()=>{
  setNotificationHidden(true);
}, [loacation])


  return (
    <div className="auth">
      <div className="auth__container">
      <div className="auth__popup-error" hidden={notificationHidden}>
          {notificationText}
        </div>
      {loacation.pathname === "/login" ? 
      <LoginPage  inputs ={LoginInputs} values ={loginValues.values} onChangeValue={loginValues.onChange} handleSubmit={handleFormSubmit}/> 
      :
      <SignupPage inputs ={SignupInputs} values ={signupValues.values} onChangeValue={signupValues.onChange} handleSubmit={handleFormSubmit} />}
      </div>
    </div>
  );
};

export default AuthRootComponent;
