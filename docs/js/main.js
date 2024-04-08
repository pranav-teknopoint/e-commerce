function apicall(method, url, data) {
  let promise = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(this.responseText);
        }
      }
    };
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  });

  return promise;
}

function authenticate(method, accessToken, url, data) {
  let AUTHpromise = new Promise(function (resolve, reject) {
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.onreadystatechange = function () {
      if (xhrPosts.readyState == 4) {
        if (xhrPosts.status == 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          console.error("Error occurred:", this.status, this.statusText);
          reject(this.responseText);
        }
      }
    };

    xhrPosts.open(method, url, true);
    xhrPosts.setRequestHeader("Content-Type", "application/json");
    xhrPosts.setRequestHeader("authorization", `Bearer ${accessToken}`);
    xhrPosts.send(JSON.stringify(data));
  });
  return AUTHpromise;
}

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

let registerTab = document.getElementById("register-tab");
let loginTab = document.getElementById("login-tab");
let registerButton = document.getElementById("register-new");
let loginButton = document.getElementById("login-new");
let saveCheckbox = document.getElementById("savelogin");
let apiserver = "https://e-commerce-i0t6.onrender.com";

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
          window.location.href = "./products.html";
        });
      })
      .catch(function (error) {
        let message = JSON.parse(error).message;
        document.querySelector(
          ".login__error-message"
        ).innerHTML = `${message}!! Try again.`;
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