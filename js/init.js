const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const INFO_USER = JSON.parse(localStorage.getItem("user")); //get el setitem del login
const NAV_BAR_LAST_LI =
  document.querySelector("#navbarNav").lastElementChild.lastElementChild;

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

let append_User = function () {
  if (INFO_USER != "") {
    var new_A = document.createElement("a"); // crear A
    new_A.classList.add("nav-link"); // añadir clases y href
    new_A.href = "#";
    NAV_BAR_LAST_LI.appendChild(new_A); //al elemento seleccionado agregar un child A

    let last_a = NAV_BAR_LAST_LI.lastElementChild; // Seleccionar el A
    last_a.innerHTML = INFO_USER; // cambiar innerHtml del A a el dato del login
  }
};

append_User();
