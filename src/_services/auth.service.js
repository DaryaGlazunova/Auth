const localStorageUserAuthDataName = "userToken";

const register = async (userAuthData) => {
  const response = await fetch("/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userAuthData),
  });
  saveUserTokenToLocalStorage(userAuthData);
  return response;
};

const login = async (userAuthData) => {
  const response = await fetch("/users/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },

    body: JSON.stringify(userAuthData),
  });
  saveUserTokenToLocalStorage(userAuthData);
  return response;
};

function removeUserTokenFromLocalStorage() {
  localStorage.removeItem(localStorageUserAuthDataName);
}

function saveUserTokenToLocalStorage(tokenDetails) {
  localStorage.setItem(
    localStorageUserAuthDataName,
    JSON.stringify(tokenDetails)
  );
}

function checkAutoLogin() {
  const tokenDetailsString = localStorage.getItem(localStorageUserAuthDataName);
  let tokenDetails = { useremail: null, id: null, userpassword: null };
  if (tokenDetailsString) {
    tokenDetails = JSON.parse(tokenDetailsString);
  }
  return tokenDetails;
}

const AuthService = {
  register,
  login,
  removeUserTokenFromLocalStorage,
  saveUserTokenToLocalStorage,
  checkAutoLogin,
};

export default AuthService;
