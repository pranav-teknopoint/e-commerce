var refreshToken = getLocalStorageItem(`refreshToken`);
var accessToken = getLocalStorageItem(`accessToken`);
var email;
let cartItems = document.getElementById("cards-container");

authenticate("POST", accessToken, `${apiserver}/api/products/products`, {})
  .then(function (res) {
    document.getElementById("unauthorized").classList.remove("display-flex");
    document.getElementById("cartpage").classList.add("display");
    email = res.email.email;
    getCartItems(email);
    document.getElementById("username").innerHTML = `${email}`;
  })
  .catch((error) => {
    document.getElementById("unauthorized").classList.add("display-flex");
    document.getElementById("cartpage").classList.remove("display");
    if (refreshToken) {
      refreshTokenlogin(refreshToken);
    }
  });

function getCartItems(email) {
  authenticate("GET", accessToken, `${apiserver}/api/cart/viewcart/${email}`)
    .then(function (res) {
      if (res.length == 0) {
        document.getElementById("empty-cart").classList.add("display-flex");
        document.querySelector(".cart-value").classList.remove("display");
      } else {
        document.getElementById("empty-cart").classList.remove("display-flex");
        document.querySelector(".cart-value").classList.add("display");
        let price = [];
        res.forEach((product) => {
          creatcategorybutton(product.Category);
          createcartItems(product);
          price.push(product.Price * product.cartQuantity);
        });
        total_value = price.sum();
        document.getElementById("total-value").innerHTML = total_value;
      }
    })
    .catch((error) => {
      console.error(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

function createcartItems(product) {
  cartItems.innerHTML += `<div class="product-card" id="${product._id}">
            <div class="product-image">
            <img src="${product.ImageUrl}" alt="" />
            </div>
            <div class="product-details">
              <div id="product-name">${product.Name}</div>
              <div id="product-description">${product.Description}</div>
              <div id="product-price">$${product.Price}</div>
              <div id="product-category">${product.Category}</div>
              <div id="product-quantity">Quantity: ${product.cartQuantity}</div>
              <div id="product-quantity">Total Value: <b>$${
                product.Price * product.cartQuantity
              }</b></div>
              <input type="button" value="Delete" id="${
                product._id
              }" onclick = "deleteItem('${product._id}', '${email}')">
            </div>
        </div>`;
}

function deleteItem(id, email) {
  data = { email };
  authenticate(
    "DELETE",
    accessToken,
    `${apiserver}/api/cart/deletefromcart/${id}`,
    data
  )
    .then((res) => {
      getCartItems(email);
      location.reload();
    })
    .catch((error) => {
      console.error(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

const categoryArray = [];
function creatcategorybutton(category) {
  let categories = document.getElementById("product-categories");
  if (categoryArray.includes(category)) {
  } else {
    categoryArray.push(category);
    categories.innerHTML += `<input type="button" class="category-button" value="${category}" id="${category}" onclick = "filterdata('${category}')"/>`;
  }
}
let cardsContainer = document.getElementById("cards-container");

function filterdata(category) {
  document.querySelectorAll(".category-button").forEach((e) => {
    e.style.backgroundColor = "#5c8374";
  });
  document.getElementById(category).style.backgroundColor = "#1b4242";
  authenticate("GET", accessToken, `${apiserver}/api/cart/category/${category}`)
    .then((res) => {
      products = res.products;
      cardsContainer.innerHTML = ``;
      products.forEach((product) => {
        createcartItems(product);
      });
    })
    .catch((error) => {
      console.error(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

document.getElementById("cart-back").addEventListener("click", () => {
  window.location.href = "./products.html";
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
