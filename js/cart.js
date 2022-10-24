// let ID = "25801";
var cnt = document.getElementById("appendCartProducts");
let dolar = 40;

const shoppingCartTotal = document.querySelector(".sum-values-items-cart");

const premiumShipping = document.getElementById("premiumShipping");
const expressShipping = document.getElementById("expressShipping");
const standardShipping = document.getElementById("standardShipping");
const creditCardPayment = document.getElementById("flexRadioDefault1Cart");
const bankAccountPayment = document.getElementById("flexRadioDefault2Cart");

// creditCardPayment.checked
// bankAccountPayment.checked
// premiumShipping.checked
// expressShipping.checked
// standardShipping.checked

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const updateTotalShoppingCart = function () {
  let total = 0;

  const shoppingCartItems = document.querySelectorAll(".shopping-cart-item");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement =
      shoppingCartItem.querySelector(".item-price");
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent
    );
    const shoppingCartItemQuantityElement =
      shoppingCartItem.querySelector(".item-quantity");
    let shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    const initialPriceArray = shoppingCartItem
      .querySelector(".item-price-with-currency")
      .textContent.split(" ");
    const initialPrice = Number(initialPriceArray.splice(1).join());

    if (initialPriceArray[0] == "UYU") {
      total = total + (initialPrice / dolar) * shoppingCartItemQuantity;
    } else {
      total = total + initialPrice * shoppingCartItemQuantity;
    }
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)} USD`;
};

const refreshPriceOnDelete = function (event) {
  const itemsCartElements = document.querySelectorAll(".shopping-cart-item");
  let total = 0;

  itemsCartElements.forEach((item) => {
    const shoppingCartItemQuantityElement =
      item.querySelector(".item-quantity");
    let shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    const initialPriceArray = item
      .querySelector(".item-price-with-currency")
      .textContent.split(" ");
    const initialPrice = Number(initialPriceArray.splice(1).join());

    if (initialPriceArray[0] == "UYU") {
      total = total + (initialPrice / dolar) * shoppingCartItemQuantity;
    } else {
      total = total + initialPrice * shoppingCartItemQuantity;
    }
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)} USD`;
};

const removeCartItem = function (event) {
  const itemCartElement = event.target.parentElement.parentElement;
  const itemCartID = itemCartElement.getAttribute("id");

  itemCartElement.remove();
  for (let i = 0; i < itemsCart.length; i++) {
    let item = itemsCart[i];
    if (item.id == itemCartID) {
      itemsCart.splice(i, 1);
      itemsCart = JSON.stringify(itemsCart);
      localStorage.setItem("cart", itemsCart);
      itemsCart = JSON.parse(localStorage.getItem("cart")) || [];
      return;
    }
  }
};

const refreshPrice = function (event) {
  const input = event.target;
  const itemQuantity = input.value;
  const itemElement = input.parentElement.parentElement.parentElement;
  const itemPriceElement = itemElement.querySelector(".item-price");
  const itemPrice = Number(itemPriceElement.textContent);

  const initialPriceArray = itemElement
    .querySelector(".item-price-with-currency")
    .textContent.split(" ");
  const initialPrice = Number(initialPriceArray.splice(1).join());

  itemPriceElement.innerHTML = itemQuantity * initialPrice;
};

document.addEventListener("DOMContentLoaded", () => {
  const showArticleInfo = function (arr) {
    let HTMLContentToAppend = "";
    for (let i = 0; i < arr.length; i++) {
      let article = arr[i];
      HTMLContentToAppend += ` 
          <div class="shopping-cart-item row mt-2 mb-4 row-cols-6" id="${article.id}">
            <div class="col">
              <img src="${article.image}" alt="" class="img-fluid">
            </div>
            <div class="col">
              ${article.name}
            </div>
            <div class="col">
              <p class="item-price-with-currency">${article.currency} ${article.cost}</p>
            </div>
            <div class="col">
              <div class="input-group input-group-sm">
                <input type="number" onchange=" refreshPrice(event);updateTotalShoppingCart();" min="1" oninput="this.value = Math.abs(this.value)" class="item-quantity form-control" aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm" value=${article.count} >
              </div>
            </div>
            <div class="col">
                <p class="item-price"> ${article.cost} </p>
            </div>
            <div class="col">
            <button type="button" onclick="removeCartItem(event); refreshPriceOnDelete(event)" class="btn btn-sm btn-danger button-delete" >X</button>
            </div>
            
          </div>
          
              `;
    }
    cnt.innerHTML = HTMLContentToAppend;
  };

  showArticleInfo(itemsCart);
  updateTotalShoppingCart();
});

/* document.addEventListener("DOMContentLoaded", async function () {
  let res = await getJSONData(CART_INFO_URL + ID + ".json");
  if (res.status === "ok") {
    var cartData = res.data;
    var cartDataArticles = cartData.articles;
    arrArticlesCart.push(cartDataArticles);
    showArticleInfo();
  }
});
 */
