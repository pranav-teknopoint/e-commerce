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
  apicall(
    "POST",
    "http://localhost:3000/api/users/refresh",
    JSON.stringify(data)
  ).then((res) => {
    setLocalStorageItem("accessToken", res.accessToken);
    location.reload();
  });
}

var refreshToken = getLocalStorageItem(`refreshToken`);
var accessToken = getLocalStorageItem(`accessToken`);

let addButton = document.getElementById("addproducts");
var ImageUrl;
addButton.addEventListener("click", () => {
  let Name = document.getElementById("newproductname").value;
  let Description = document.getElementById("newproductdescription").value;
  let Price = document.getElementById("newproductprice").value;
  let Category = document.getElementById("newproductcategory").value;
  let StockQuantity = document.getElementById("newproductstockquantity").value;

  var formData = new FormData();
  formData.append(
    "productimage",
    document.getElementById("productimage").files[0]
  );
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/images/uploadimage", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      ImageUrl = `http://localhost:3000/api/images/viewimage/${this.responseText}`;
      if (Name && Description && Price && Category && StockQuantity) {
        data = { Name, Description, Price, Category, StockQuantity, ImageUrl };
        authenticate(
          "POST",
          accessToken,
          "http://localhost:3000/api/products/addproducts",
          data
        )
          .then((res) => {
            console.log(res);
            getproducts();
            location.reload();
          })
          .catch((error) => {
            console.log(error);
            if (refreshToken) {
              refreshTokenlogin(refreshToken);
            }
          });
      }
    } else {
      alert("Error uploading image. Please try again.");
    }
  };
  xhr.send(formData);
});

function getproducts() {
  authenticate(
    "POST",
    accessToken,
    "http://localhost:3000/api/admin/productsadmin"
  )
    .then(function (res) {
      console.log("WELCOME ADMIN!!");
      email = res.email.email;
      products = res.products;
      document.getElementById("adminpage").classList.add("display");
      document.getElementById("unauthorized").classList.remove("display-flex");

      authenticate(
        "GET",
        accessToken,
        `http://localhost:3000/api/users/viewuser/${email}`
      ).then(function (res) {
        console.log(res);
        document.getElementById("username").innerHTML = `${res.username}`;
        document.getElementById("useremail").innerHTML = `${res.email}`;
        document.getElementById("userphone").innerHTML = `${res.phone}`;
        document.querySelector(".change-password").innerHTML += `<input
            type="button"
            value="Change Password"
            id="editpassword"
            onclick="editpassword('${res._id}')"
          />`;
      });

      let cardsContainer = document.getElementById("cards-container");
      products.forEach((e) => {
        cardsContainer.innerHTML += `<div class="product-card" id="${e._id}">
            <div class="product-image">
              <img src="${e.ImageUrl}" alt="" />
              <input
            type="button"
            value="Edit Image"
            id="edit${e._id}"
            onclick="editImage('${e._id}', '${email}')"
          />
            </div>
            <div class="product-details">
              <div id="product-name">${e.Name}</div>
              <div id="product-description">${e.Description}</div>
              <div id="product-price">$${e.Price}</div>
              <div id="product-category">${e.Category}</div>
              <div id="product-stockquantity">Stock Quantity: ${e.StockQuantity}</div>
              <input
                type="button"
                value="Edit Product"
                id="edit${e._id}"
                onclick="editProducts('${e._id}', '${email}')"
              />
              <input
                type="button"
                value="Delete Product"
                id="${e._id}"
                onclick="deleteProducts('${e._id}', '${email}')"
              />
            </div>
          </div>`;
      });
    })
    .catch((error) => {
      console.log(error);
      console.log("NOT ADMIN!!");
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

getproducts();

function deleteProducts(id, email) {
  authenticate(
    "DELETE",
    accessToken,
    `http://localhost:3000/api/products/deleteproducts/${id}`,
    { email: email }
  )
    .then((res) => {
      console.log(res);
      getproducts();
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

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
        `http://localhost:3000/api/users/editpassword/${id}`,
        data
      )
        .then((res) => {
          console.log(res);
          document.getElementById(
            "change-message"
          ).innerHTML = `Password Changed Successfully!!`;
          setTimeout(() => {
            document.getElementById("change-message").innerHTML = ``;
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          if (refreshToken) {
            refreshTokenlogin(refreshToken);
          }
        });
    }
  });
}

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

document.getElementById("cart-back").addEventListener("click", () => {
  window.location.href = "./products.html";
});

function saveProducts(id) {
  let Name = document.getElementById("updateproductname").value;
  let Description = document.getElementById("updateproductdescription").value;
  let Price = document.getElementById("updateproductprice").value;
  let Category = document.getElementById("updateproductcategory").value;
  let StockQuantity = document.getElementById(
    "updateproductstockquantity"
  ).value;
  ImageUrl = document
    .getElementById(id)
    .querySelector(`.product-image img`).src;

  if (Name && Description && Price && Category && StockQuantity) {
    data = { Name, Description, Price, Category, StockQuantity, ImageUrl };
    authenticate(
      "POST",
      accessToken,
      `http://localhost:3000/api/admin/edit/${id}`,
      data
    )
      .then((res) => {
        console.log(res);
        getproducts();
        location.reload();
      })
      .catch((error) => {
        console.log(error);
        if (refreshToken) {
          refreshTokenlogin(refreshToken);
        }
      });
  }
}

function editProducts(id) {
  let productCard = document.getElementById(id);
  oldproductname = productCard.querySelector("#product-name").innerHTML;
  productCard.querySelector("#product-name").innerHTML = `<input
                  type="text"
                  name="product-name"
                  id="updateproductname"
                  placeholder="Enter new product name"
                  value = ${oldproductname}
                />`;
  oldproductdescription = productCard.querySelector(
    "#product-description"
  ).innerHTML;
  productCard.querySelector("#product-description").innerHTML = `<input
                  type="text"
                  name="product-description"
                  id="updateproductdescription"
                  placeholder="Enter new product description"
                  value = ${oldproductdescription}
                />`;
  oldproductprice = productCard.querySelector("#product-price").innerHTML;
  productCard.querySelector("#product-price").innerHTML = `<input
                  type="number"
                  name="product-price"
                  id="updateproductprice"
                  placeholder="Enter new product price"
                  value = ${oldproductprice.split("$").join("")}
                />`;
  oldproductcategory = productCard.querySelector("#product-category").innerHTML;
  productCard.querySelector("#product-category").innerHTML = `<input
                  type="text"
                  name="product-category"
                  id="updateproductcategory"
                  placeholder="Enter new product category"
                  value = ${oldproductcategory}
                />`;
  oldproductstockquantity = productCard.querySelector(
    "#product-stockquantity"
  ).innerHTML;

  oldproductstockquantity = oldproductstockquantity.split(" ");
  productCard.querySelector("#product-stockquantity").innerHTML = `<input
                  type="number"
                  name="product-stockquantity"
                  id="updateproductstockquantity"
                  placeholder="Enter new product stockquantity"
                  value = ${
                    oldproductstockquantity[oldproductstockquantity.length - 1]
                  }
                />`;

  productCard
    .querySelector(".product-details")
    .querySelector(`#edit${id}`)
    .remove();
  productCard.querySelector(
    ".product-details"
  ).innerHTML += `<div class='editors'>
  <input
                type="button"
                value="Save Product"
                id="save${id}"
                onclick="saveProducts('${id}', '${email}')"
              />
              <input
                type="button"
                value="Cancel"
                id="cancel${id}"
                onclick="window.location.reload();"
              /></div>`;
}

function editImage(id) {
  let oldimageurl = document
    .getElementById(id)
    .querySelector(`.product-image img`).src;
  document
    .getElementById(id)
    .querySelector(
      ".product-image"
    ).innerHTML = `<form id="updateimage" enctype="multipart/form-data">
              <label for="updateproductimage">Select Product image: </label>
              <input
                type="file"
                name="updateproductimage"
                id="updateproductimage"
                accept="image/*"
              />
              <div class="editors">
              <input
                type="button"
                value="Save Image"
                id="save${id}"
                onclick="saveImage('${id}', '${oldimageurl}')"
              />
              <input
                type="button"
                value="Cancel"
                id="cancel${id}"
                onclick="window.location.reload();"
              /></div>
            </form>`;
}

function saveImage(id, oldimageurl) {
  oldimageurl = oldimageurl.split("/");

  var formData = new FormData();
  formData.append(
    "updateproductimage",
    document.getElementById("updateproductimage").files[0]
  );
  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `http://localhost:3000/api/images/editimage/${id}/${
      oldimageurl[oldimageurl.length - 1]
    }`,
    true
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(this.responseText);
      ImageUrl = `http://localhost:3000/api/images/viewimage/${this.responseText}`;

      document
        .getElementById(id)
        .querySelector(
          ".product-image"
        ).innerHTML = `<img src="${ImageUrl}" alt="" />
        <input
            type="button"
            value="Edit Image"
            id="edit${id}"
            onclick="editImage('${id}', '${email}')"
          />`;
    } else {
      alert("Error uploading image. Please try again.");
    }
  };
  xhr.send(formData);
}
