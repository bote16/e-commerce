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

const DROPDOWN = document.getElementById("DroDown");

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

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
    //else Iniciar sesion y redireccionar
    var new_div = document.createElement("div"); // crear div
    var new_A = document.createElement("a"); // crear A
    var new_A_1 = document.createElement("a"); //crear A para dropdown
    var new_ul = document.createElement("ul"); //crear UL
    var new_li = document.createElement("li");

    // añadir clases y href al a
    new_A.classList.add("dropdown-toggle");
    new_A.classList.add("nav-link");
    new_A.classList.add("btn");

    new_A.href = "#";

    //agregar atributos al A
    new_A.setAttribute("role", "button");
    new_A.setAttribute("id", "dropdownMenuLink");
    new_A.setAttribute("data-bs-toggle", "dropdown");
    new_A.setAttribute("aria-expanded", "false");

    DROPDOWN.appendChild(new_A);

    let last_a = NAV_BAR_LAST_LI.lastElementChild; // Seleccionar el A
    last_a.innerHTML = INFO_USER; // cambiar innerHtml del A a el dato del login

    new_ul.classList.add("dropdown-menu");
    new_ul.setAttribute("aria-labelledby", "dropdownMenuLink");

    DROPDOWN.appendChild(new_ul);

    var ul = DROPDOWN.lastElementChild; // seleccionar UL

    //agregar el Mi carrito, Mi perfil, Cerrar sesion
    ul.appendChild(new_li); // agregar li

    var li = ul.lastElementChild; //seleccionar li
    new_A_1.classList.add("dropdown-item");
    new_A_1.href = "#";
    li.appendChild(new_A_1);

    var a_dropdown_mi_carrito = li.lastElementChild;
    a_dropdown_mi_carrito.innerHTML = "Mi carrito";
  }
};

append_User();
