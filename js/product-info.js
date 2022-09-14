let productID = localStorage.getItem("productID");

document.addEventListener("DOMContentLoaded", async function () {
  const prodPrice = document.querySelector("#prodPrice");
  const prodSoldCount = document.querySelector("#prodSoldCount");
  const prodDescription = document.querySelector("#prodDescription");
  const prodCategory = document.querySelector("#prodCategory");
  const divImageProd = document.querySelector("#image-cnt");
  const prodName = document.querySelector("#prodName");

  let res = await getJSONData(PRODUCT_INFO_URL + productID + ".json");
  if (res.status === "ok") {
    product = res.data;
    product_images_array = product.images;
    showProductPhotos();
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
});
