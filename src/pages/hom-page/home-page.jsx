import React from "react";
import "./_style.scss";

const HomePage = (props) => {
  const {user} = {...props}

  return (
    <div className="main">
      {user.useremail ? <div className="main__title">Вход в систему выполнен успешно! :)</div> :
      <div className="main__title">Необходимо выполнить вход в систему :(</div>
      }
      
    </div>
  );
};

export default HomePage;
