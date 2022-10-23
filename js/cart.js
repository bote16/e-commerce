let ID = "25801";
var cnt = document.getElementById("appendCartProducts");

const updateTotalShoppingCart = function () {
  let total = 0;

  const shoppingCartItems = document.querySelectorAll(".shopping-cart-item");
  const shoppingCartTotal = document.querySelector(".sum-values-items-cart");

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

    total = total + initialPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total}$`;
};

const refreshPriceOnDelete = function (event) {
  const button = event.target;
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

  // usar otro valor sin modificar el que necesitamos mostrar
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
            <button type="button" onclick="removeCartItem(event); refreshPriceOnDelete(event)" class="btn btn-sm btn-danger button-delete" data-id=${i} >X</button>
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
