var apiserver = "https://e-commerce-i0t6.onrender.com";

// *---functions---* //

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

function refreshTokenlogin(token) {
  data = {
    refreshToken: token,
  };
  apicall("POST", `${apiserver}/api/users/refresh`, JSON.stringify(data)).then(
    (res) => {
      setLocalStorageItem("accessToken", res.accessToken);
      location.reload();
    }
  );
}

Array.prototype.sum = function () {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum = sum + +this[i];
  }
  return sum;
};
