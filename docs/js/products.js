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
            id="editpassword-${res._id}"
            onclick="editpassword('${res._id}')"
          />`;
      if (res.role == "admin") {
        adminButton.classList.add("display");
      }
    });

    products.forEach((e) => {
      creatcategorybutton(`${e.Category}`);
      createProductCards(e);
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
        createProductCards(e);
      });
    })
    .catch((error) => {
      console.error(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

function getallproducts() {
  document.querySelectorAll(".category-button").forEach((e) => {
    e.style.backgroundColor = "#5c8374";
  });
  authenticate("POST", accessToken, `${apiserver}/api/products/products`)
    .then(function (res) {
      products = res.products;
      cardsContainer.innerHTML = ``;
      products.forEach((e) => {
        creatcategorybutton(`${e.Category}`);
        createProductCards(e);
      });
    })
    .catch((error) => {
      console.log(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

function createProductCards(e) {
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

function cancelpassword(id) {
  document.getElementById("password-edit").classList.remove("display-flex");
  document.getElementById(`editpassword-${id}`).value = "Change Password";
  document
    .getElementById(`editpassword-${id}`)
    .setAttribute("onclick", `editpassword('${id}');`);
}

function editpassword(id) {
  document.getElementById("password-edit").classList.add("display-flex");
  document.getElementById(`editpassword-${id}`).value = "Cancel";
  document
    .getElementById(`editpassword-${id}`)
    .setAttribute("onclick", `cancelpassword('${id}');`);
  let oldPassword = document.getElementById("oldpassword");
  let newPassword = document.getElementById("newpassword");
  let confirmPassword = document.getElementById("confirmnewpassword");
  let savePassword = document.getElementById("savepassword");
  savePassword.addEventListener("click", () => {
    if (newPassword.value === confirmPassword.value) {
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
