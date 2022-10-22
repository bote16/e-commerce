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

    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(1)}$`;
};

const refreshPrice = function (event) {
  const input = event.target;
  const itemQuantity = input.value;
  const itemElement = input.parentElement.parentElement.parentElement;
  const itemPriceElement = itemElement.querySelector(".item-price");
  const itemPrice = Number(itemPriceElement.textContent);

  // usar el otro para no modificar el value
  const initialPrice = Number(
    itemElement.querySelector(".item-price-with-currency").split("$") // arreglar
  );
  console.log(initialPrice);

  itemPriceElement.innerHTML = itemQuantity * initialPrice;
};

document.addEventListener("DOMContentLoaded", () => {
  const showArticleInfo = function (arr) {
    let HTMLContentToAppend = "";
    for (let i = 0; i < arr.length; i++) {
      let article = arr[i];
      HTMLContentToAppend += ` 
          <div class="shopping-cart-item row mt-2 mb-4 row-cols-6">
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
                <input type="number" onchange="updateTotalShoppingCart(); refreshPrice(event)" min="0" oninput="this.value = Math.abs(this.value)" class="item-quantity form-control" aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm" value=${article.count} >
              </div>
            </div>
            <div class="col">
                <p class="item-price"> ${article.cost} </p>
            </div>
            <div class="col">
            <button type="button" class="btn btn-sm btn-danger button-delete">Quitar</button>
            </div>
          </div>
          <hr>
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

/* const refreshPrice = function (i) {
  let input_value = document.getElementById(i).value;
  let total_price = document.getElementById(i + 1);
  let article_arr = itemsCart[i];
  let initial_price = article_arr.cost;

  if (input_value > 0) {
    total_price.innerText = input_value * initial_price;
  } else {
    total_price.innerText = initial_price;
  }
}; */
