let ID = "25801";
var cnt = document.getElementById("appendCartProducts");

const showArticleInfo = function (arr) {
  let HTMLContentToAppend = "";
  for (let i = 0; i < arr.length; i++) {
    let article = arr[i]; //array con info del article con los elementos nuevos
    HTMLContentToAppend += `
          <div class="row row-cols-5 mt-2 mb-4">
          <div class="col">
            <img src="${article.image}" alt="" class="img-fluid">
          </div>
          <div class="col">
            <p>${article.name}</p>
          </div>
          <div class="col">
            <p>${article.currency} ${article.cost}</p>
          </div>
          <div class="col">
            <div class="input-group input-group-sm">
              <input type="number" onchange="refreshPrice(${i})" min="0" oninput="this.value = Math.abs(this.value)" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm" value=${
                  article.count
                } id="${i.toString()}">
            </div>
          </div>
          <div class="col" >
              <p id="${(i + 1).toString()}"> ${article.cost} </p>
          </div>
        </div>
        <hr>
            `;
  }
  cnt.innerHTML = HTMLContentToAppend;
};

showArticleInfo(itemsCart);

const refreshPrice = function (i) {
  let input_value = document.getElementById(i).value;
  let total_price = document.getElementById(i + 1);
  let article_arr = itemsCart[i];
  let initial_price = article_arr.cost;

  if (input_value > 0) {
    total_price.innerText = input_value * initial_price;
  } else {
    total_price.innerText = initial_price;
  }
};

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
