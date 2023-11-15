let users = JSON.parse(localStorage.getItem("users")) || [];

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    const { method } = opts;
    const body = opts.body && JSON.parse(opts.body);

    return new Promise((resolve, reject) => {
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith("/users/authenticate") && method === "POST":
            return authenticate();
          case url.endsWith("/users/register") && method === "POST":
            return register();
          default:
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      function authenticate() {
        const { useremail, userpassword } = body;
        const user = users.find(
          (x) => x.useremail === useremail && x.userpassword === userpassword
        );
        if (!user) return error("Введен неверный email или пароль");
        return ok({
          id: user.id,
          useremail: user.useremail,
          token: "fake-jwt-token",
        });
      }

      function register() {
        const user = body;

        if (users.find((x) => x.useremail === user.useremail)) {
          return error(
            `Email  ${user.useremail} уже зарегестрирован в системе`
          );
        }
        user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        return ok();
      }

      function ok(body) {
        resolve({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(body)),
        });
      }

      function error(message) {
        reject({
          status: 400,
          errorMessage: message,
          text: () => Promise.resolve(JSON.stringify({ message })),
        });
      }
    });
  };
}
