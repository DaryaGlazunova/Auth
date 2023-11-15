import React from "react";
import AuthRootComponent from "./components/auth/index";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/hom-page/home-page";
import Header from './components/header/header';
import AuthService from "./_services/auth.service";


function App() {
  const [user, setUser] = React.useState(AuthService.checkAutoLogin());


  return (
    <div className="wrapper">
      <Header user={user} setUser={setUser}/>
      <Routes>
      <Route path="/" element={<HomePage user={user} />} />
        <Route path="login" element={<AuthRootComponent setUser={setUser}/>} />
        <Route path="signup" element={<AuthRootComponent setUser={setUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
