var currentmode = getLocalStorageItem("currentmode");

function checkdarkmode() {
  darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (!darkmode || currentmode == "light") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function changetheme() {
  currentmode = getLocalStorageItem("currentmode");
  if (currentmode == "dark") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setLightMode() {
  setLocalStorageItem("currentmode", "light");
  document.getElementById("mode-icon").innerHTML = "dark_mode";
  document.querySelector("body").classList.add("light");
  document.getElementById("navbar").classList.add("light");
  document.querySelector(".user-details").classList.add("light-grey-small");
  document.querySelectorAll(".product-card").forEach((card) => {
    card.classList.add("grey");
  });
  document.querySelectorAll(".product-details").forEach((card) => {
    card.classList.add("light-grey");
  });
  document.querySelectorAll('input[type="button"]').forEach((button) => {
    button.classList.add("buttons");
  });
  document.querySelectorAll(".tabs").forEach((button) => {
    button.classList.add("buttons");
  });
  document.querySelectorAll(".user-profile").forEach((button) => {
    button.classList.add("buttons");
  });
  document.querySelectorAll(".view-cart").forEach((button) => {
    button.classList.add("buttons");
  });
  document.querySelectorAll(".adminbutton").forEach((button) => {
    button.classList.add("buttons");
  });
  document.querySelectorAll(".themechanger").forEach((button) => {
    button.classList.add("buttons");
  });
  document.querySelectorAll(".cart-back").forEach((button) => {
    button.classList.add("buttons");
  });
  document.querySelectorAll(".cart-value").forEach((button) => {
    button.classList.add("buttons");
  });
}

function setDarkMode() {
  setLocalStorageItem("currentmode", "dark");
  document.getElementById("mode-icon").innerHTML = "light_mode";
  document.querySelector("body").classList.remove("light");
  document.getElementById("navbar").classList.remove("light");
  document.querySelector(".user-details").classList.remove("light-grey-small");
  document.querySelectorAll(".product-card").forEach((card) => {
    card.classList.remove("grey");
  });
  document.querySelectorAll(".product-details").forEach((card) => {
    card.classList.remove("light-grey");
  });
  document.querySelectorAll('input[type="button"]').forEach((button) => {
    button.classList.remove("buttons");
  });
  document.querySelectorAll(".tabs").forEach((button) => {
    button.classList.remove("buttons");
  });
  document.querySelectorAll(".user-profile").forEach((button) => {
    button.classList.remove("buttons");
  });
  document.querySelectorAll(".view-cart").forEach((button) => {
    button.classList.remove("buttons");
  });
  document.querySelectorAll(".adminbutton").forEach((button) => {
    button.classList.remove("buttons");
  });
  document.querySelectorAll(".themechanger").forEach((button) => {
    button.classList.remove("buttons");
  });
  document.querySelectorAll(".cart-back").forEach((button) => {
    button.classList.remove("buttons");
  });
  document.querySelectorAll(".cart-value").forEach((button) => {
    button.classList.remove("buttons");
  });
}

checkdarkmode();
