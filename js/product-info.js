let productID = localStorage.getItem("productID");

document.addEventListener("DOMContentLoaded", async function () {
  const prodPrice = document.querySelector("#prodPrice");
  const prodSoldCount = document.querySelector("#prodSoldCount");
  const prodDescription = document.querySelector("#prodDescription");
  const prodCategory = document.querySelector("#prodCategory");
  const divImageProd = document.querySelector("#image-cnt");
  const prodName = document.querySelector("#prodName");
  const cntComments = document.querySelector("#comments-container");
  const starFilled = `<span class="fa fa-star checked"></span>`;
  const starUnfilled = `<span class="fa fa-star"></span>`;

  let res = await getJSONData(PRODUCT_INFO_URL + productID + ".json");
  if (res.status === "ok") {
    product = res.data;
    product_images_array = product.images;
    showProductPhotos();
  }

  let res_comment = await getJSONData(
    PRODUCT_INFO_COMMENTS_URL + productID + ".json"
  );
  if (res_comment.status === "ok") {
    comments = res_comment.data; //array --
    showCommentInfo();
  }

  prodName.innerText = product.name;
  product.currency + " " + product.cost;
  prodSoldCount.innerText = product.soldCount;
  prodDescription.innerText = product.description;
  prodCategory.innerText = product.category;

  function showProductPhotos() {
    let htmlContentToAppend = "";

    for (let i = 0; i < product_images_array.length; i++) {
      let image = product_images_array[i];

      htmlContentToAppend += `
      <div class="row p-2">  
          <img src="${image}" alt="${product.description}" class="img-thumbnail">
      </div>
  `;
    }

    divImageProd.innerHTML = htmlContentToAppend;
  }

  function showCommentInfo() {
    let htmlContentToAppend = "";

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];

      const starsFill = (score) => {
        let estrellitas = "";
        for (let index = 0; index < score; index++) {
          estrellitas += `<span class="fa fa-star checked"></span>`;
        }
        if (score < 5) {
          for (let index = score; index < 5; index++) {
            estrellitas += `<span class="fa fa-star"></span>`;
          }
        }
        return estrellitas;
      };

      htmlContentToAppend += `
      <div class="p-2 mt-2 overflow-hidden shadow rounded cursor-active">
            <div class="row">
              <div class="col">
                <p class="fst-italic fw-bold">${comment.user} - ${
        comment.dateTime
      }</p>
              </div>
            </div>
            <div class="row">
              <p class="fst-italic">${comment.description}</p>
            </div>
            <div class="row">
            <p>${starsFill(comment.score)}</p>  
            </div>
          </div>
  `;
    }
    cntComments.innerHTML += htmlContentToAppend;
  }

  function fillStars() {
    //esto sirve para la parte 4, cuando el usuario clickea que haga fill o quite. Crear queryselector con clase fa-stars, la otra se usa para el fetch de comment
    stars.forEach((star, i) => {
      star.onclick = function () {
        let current_star = i + 1;
        stars.forEach((star, j) => {
          if (current_star >= j + 1) {
            star.classList.add("checked");
          } else {
            star.classList.remove("checked");
          }
        });
      };
    });
  }
});
