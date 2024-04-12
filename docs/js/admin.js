var refreshToken = getLocalStorageItem(`refreshToken`);
var accessToken = getLocalStorageItem(`accessToken`);
var ImageUrl;

let addButton = document.getElementById("addproducts");
let cardsContainer = document.getElementById("cards-container");

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
  xhr.open("POST", `${apiserver}/api/images/uploadimage`, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      ImageUrl = `${apiserver}/api/images/viewimage/${this.responseText}`;
      if (Name && Description && Price && Category && StockQuantity) {
        data = { Name, Description, Price, Category, StockQuantity, ImageUrl };
        authenticate(
          "POST",
          accessToken,
          `${apiserver}/api/products/addproducts`,
          data
        )
          .then((res) => {
            getallproducts();
            document.getElementById("newproductname").value = ``;
            document.getElementById("newproductdescription").value = ``;
            document.getElementById("newproductprice").value = ``;
            document.getElementById("newproductcategory").value = ``;
            document.getElementById("newproductstockquantity").value = ``;
          })
          .catch((error) => {
            console.error(error);
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

authenticate("POST", accessToken, `${apiserver}/api/admin/productsadmin`)
  .then(function (res) {
    console.log("WELCOME ADMIN!!");
    email = res.email.email;
    products = res.products;
    document.getElementById("adminpage").classList.add("display");
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
    });

    products.forEach((e) => {
      createProductscards(e);
    });
  })
  .catch((error) => {
    console.error(error);
    if (refreshToken) {
      refreshTokenlogin(refreshToken);
    }
  });

function getallproducts() {
  cardsContainer.innerHTML = ``;
  authenticate("POST", accessToken, `${apiserver}/api/admin/productsadmin`)
    .then(function (res) {
      email = res.email.email;
      products = res.products;
      products.forEach((e) => {
        createProductscards(e);
      });
    })
    .catch((error) => {
      console.error(error);
      if (refreshToken) {
        refreshTokenlogin(refreshToken);
      }
    });
}

function createProductscards(e) {
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
}

function deleteProducts(id, email) {
  authenticate(
    "DELETE",
    accessToken,
    `${apiserver}/api/products/deleteproducts/${id}`,
    { email: email }
  )
    .then((res) => {
      getallproducts();
    })
    .catch((error) => {
      console.error(error);
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
    authenticate("POST", accessToken, `${apiserver}/api/admin/edit/${id}`, data)
      .then((res) => {
        getallproducts();
      })
      .catch((error) => {
        console.error(error);
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
                onclick="getallproducts();"
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
                onclick="getallproducts();"
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
    `${apiserver}/api/images/editimage/${id}/${
      oldimageurl[oldimageurl.length - 1]
    }`,
    true
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      ImageUrl = `${apiserver}/api/images/viewimage/${this.responseText}`;

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
