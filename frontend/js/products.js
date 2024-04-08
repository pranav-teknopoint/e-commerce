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

let apiserver = "http://localhost:3000";
var refreshToken = getLocalStorageItem(`refreshToken`);
var accessToken = getLocalStorageItem(`accessToken`);
var email;

let adminButton = document.querySelector(".adminbutton");
let cardsContainer = document.getElementById("cards-container");

authenticate("POST", accessToken, `${apiserver}/api/products/products`)
  .then(function (res) {
    email = res.email.email;
    products = res.products;
    document.getElementById("productspage").classList.add("display");
    document.getElementById("unauthorized").classList.remove("display-flex");

    authenticate(
      "GET",
      accessToken,
      `${apiserver}/api/users/viewuser/${email}`
    ).then(function (res) {
      document.getElementById("username").innerHTML = `${res.username}`;
      document.getElementById("useremail").innerHTML = `${res.email}`;
      document.getElementById("userphone").innerHTML = `${res.phone}`;
      document.querySelector(".change-password").innerHTML += `<input
            type="button"
            value="Change Password"
            id="editpassword"
            onclick="editpassword('${res._id}')"
          />`;
      if (res.role == "admin") {
        adminButton.classList.add("display");
      }
    });

    products.forEach((e) => {
      creatcategorybutton(`${e.Category}`);
      cardsContainer.innerHTML += `<div class="product-card" id="${e._id}">
            <div class="product-image">
              <img src="${e.ImageUrl}" alt="" />
            </div>
            <div class="product-details">
              <div id="product-name">${e.Name}</div>
              <div id="product-description">${e.Description}</div>
              <div id="product-price">$${e.Price}</div>
              <div id="product-category">${e.Category}</div>
              <input
              type="button"
              value="Add to cart"
              id="${e._id}"
              onclick="addtocart('${e._id}', '${email}')"
              />
              <div class="addedtocart" id="carttooltip${e._id}"><p>Added to cart!!</p></div>
            </div>`;
    });
    authenticate(
      "GET",
      accessToken,
      `${apiserver}/api/cart/cartnumber/${email}`
    ).then((res) => {
      if (res.TotalQty > 0) {
        document.getElementById("cartitems").classList.add("display-flex");
        document.getElementById("cartitems").innerHTML = res.TotalQty;
      } else {
        document.getElementById("cartitems").classList.remove("display-flex");
        document.getElementById("cartitems").innerHTML = "";
      }
    });
  })
  .catch((error) => {
    console.error(error);
    if (refreshToken) {
      refreshTokenlogin(refreshToken);
    }
  });

const categoryArray = [];
function creatcategorybutton(category) {
  let categories = document.getElementById("product-categories");
  if (categoryArray.includes(category)) {
  } else {
    categoryArray.push(category);
    categories.innerHTML += `<input type="button" class="category-button" value="${category}" id="${category}" onclick = "filterdata('${category}')"/>`;
  }
}

function filterdata(category) {
  document.querySelectorAll(".category-button").forEach((e) => {
    e.style.backgroundColor = "#5c8374";
  });
  document.getElementById(category).style.backgroundColor = "#1b4242";
  authenticate(
    "POST",
    accessToken,
    `${apiserver}/api/products/category/${category}`
  )
    .then((res) => {
      products = res.products;
      cardsContainer.innerHTML = ``;
      products.forEach((e) => {
        cardsContainer.innerHTML += `<div class="product-card" id="${e._id}">
            <div class="product-image">
              <img src="${e.ImageUrl}" alt="" />
            </div>
            <div class="product-details">
              <div id="product-name">${e.Name}</div>
              <div id="product-description">${e.Description}</div>
              <div id="product-price">$${e.Price}</div>
              <div id="product-category">${e.Category}</div>
              <input
              type="button"
              value="Add to cart"
              id="${e._id}"
              onclick="addtocart('${e._id}', '${email}')"
              />
              <div class="addedtocart" id="carttooltip${e._id}"><p>Added to cart!!</p></div>
            </div>`;
      });
    })
    .catch((error) => {
      console.error(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

function addtocart(id, email) {
  data = {
    id,
    user: email,
  };
  authenticate("POST", accessToken, `${apiserver}/api/cart/addtocart`, data)
    .then(function (res) {
      document.getElementById(`carttooltip${id}`).classList.add("display");
      setTimeout(() => {
        document.getElementById(`carttooltip${id}`).classList.remove("display");
      }, 3000);
      authenticate(
        "GET",
        accessToken,
        `${apiserver}/api/cart/cartnumber/${email}`
      ).then((res) => {
        if (res.TotalQty > 0) {
          document.getElementById("cartitems").classList.add("display-flex");
          document.getElementById("cartitems").innerHTML = res.TotalQty;
        } else {
          document.getElementById("cartitems").classList.remove("display-flex");
          document.getElementById("cartitems").innerHTML = "";
        }
      });
    })
    .catch((error) => {
      console.error(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

let viewCart = document.getElementById("view-cart");

viewCart.addEventListener("click", () => {
  authenticate("GET", accessToken, `${apiserver}/api/cart/viewcart/${email}`)
    .then(function (res) {
      window.location.href = "./cart.html";
    })
    .catch((error) => {
      console.error(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
});

function editpassword(id) {
  document.getElementById("password-edit").classList.add("display-flex");
  oldPassword = document.getElementById("oldpassword");
  newPassword = document.getElementById("newpassword");
  confirmPassword = document.getElementById("confirmnewpassword");
  savePassword = document.getElementById("savepassword");
  savePassword.addEventListener("click", () => {
    if (newPassword.value == confirmPassword.value) {
      const data = {
        id: id,
        newpassword: confirmPassword.value,
      };
      authenticate(
        "PUT",
        accessToken,
        `${apiserver}/api/users/editpassword/${id}`,
        data
      )
        .then((res) => {
          document.getElementById(
            "change-message"
          ).innerHTML = `Password Changed Successfully!!`;
          setTimeout(() => {
            document.getElementById("change-message").innerHTML = ``;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          if (refreshToken) {
            refreshTokenlogin(refreshToken);
          }
        });
    }
  });
}

adminButton.addEventListener("click", () => {
  window.location.href = "./admin.html";
});

let userProfile = document.getElementById("user-profile");
userProfile.addEventListener("click", () => {
  document.querySelector(".user-details").classList.toggle("display");
});

let logOut = document.getElementById("logout");
logOut.addEventListener("click", () => {
  removeLocalStorageItem(`accessToken`);
  removeLocalStorageItem(`refreshToken`);
  window.location.href = "./index.html";
});
