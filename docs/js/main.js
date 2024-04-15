let registerTab = document.getElementById("register-tab");
let loginTab = document.getElementById("login-tab");
let registerButton = document.getElementById("register-new");
let loginButton = document.getElementById("login-new");
let saveCheckbox = document.getElementById("savelogin");

registerTab.addEventListener("click", () => {
  registerTab.classList.add("selected");
  loginTab.classList.remove("selected");
  document.querySelector(".register").classList.add("display-flex");
  document.querySelector(".login").classList.remove("display-flex");
  document.querySelector(".login-title").innerHTML = `<p>Sign-up</p>`;
});

loginTab.addEventListener("click", () => {
  loginTab.classList.add("selected");
  registerTab.classList.remove("selected");
  document.querySelector(".login").classList.add("display-flex");
  document.querySelector(".register").classList.remove("display-flex");
  document.querySelector(".login-title").innerHTML = `<p>Log-in</p>`;
});

loginButton.addEventListener("click", () => {
  let loginEmail = document.getElementById("login-email").value;
  let loginPassword = document.getElementById("login-password").value;
  if (loginEmail && loginPassword) {
    data = {
      email: loginEmail,
      password: loginPassword,
    };

    apicall("POST", `${apiserver}/api/users/login`, JSON.stringify(data))
      .then(function (response) {
        accessToken = response.accessToken;
        refreshToken = response.refreshToken;
        if (saveCheckbox.checked) {
          setLocalStorageItem("refreshToken", refreshToken);
        }
        setLocalStorageItem("accessToken", accessToken);
        authenticate(
          "POST",
          accessToken,
          `${apiserver}/api/products/products`
        ).then(function (res) {
          // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          //   setLocalStorageItem("currentmode", "dark");
          // }
          window.location.href = "./products.html";
        });
      })
      .catch(function (error) {
        let message = JSON.parse(error).message;
        document.querySelector(
          ".login__error-message"
        ).innerHTML = `Invalid Credentials!! Try Again.`;
      });
  } else {
    document.querySelector(
      ".login__error-message"
    ).innerHTML = `Please enter Email and Password!!`;
  }
});

registerButton.addEventListener("click", () => {
  let registerName = document.getElementById("register-username").value;
  let registerEmail = document.getElementById("register-email").value;
  let registerPassword = document.getElementById("register-password").value;
  let registerPhone = document.getElementById("register-phone").value;
  if (registerName && registerPassword && registerEmail && registerPhone) {
    data = {
      username: registerName,
      email: registerEmail,
      password: registerPassword,
      phone: registerPhone,
    };

    apicall("POST", `${apiserver}/api/users/register`, JSON.stringify(data))
      .then(function (response) {
        document.querySelector(
          ".register__error-message"
        ).innerHTML = `User registered sucessfully!!`;
      })
      .catch(function (error) {
        console.error(error);
        document.querySelector(
          ".register__error-message"
        ).innerHTML = `${error}!!`;
      });
  } else {
    document.querySelector(
      ".register__error-message"
    ).innerHTML = `All details are required!!`;
  }
});

function refreshTokenlogin(token) {
  data = {
    refreshToken: token,
  };
  apicall("POST", `${apiserver}/api/users/refresh`, JSON.stringify(data))
    .then((res) => {
      setLocalStorageItem("accessToken", res.accessToken);
      location.href = "./products.html";
    })
    .catch((error) => {
      console.error(error);
    });
}
var refreshToken = getLocalStorageItem(`refreshToken`);
if (refreshToken) {
  refreshTokenlogin(refreshToken);
}

checkdarkmode();
