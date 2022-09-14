let catID = localStorage.getItem("catID");

var productos = null;

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", async function () {
  const lista_productos = document.querySelector(".lista-productos");

  const ORDER_ASC_BY_COST = "AZ";
  const ORDER_DESC_BY_COST = "ZA";
  const ORDER_BY_PROD_SOLD_COUNT = "Cant. Vend";
  let currentSortCriteria = undefined;
  let minCount = undefined;
  let maxCount = undefined;

  let res = await getJSONData(PRODUCTS_URL + catID + ".json");

  if (res.status === "ok") {
    productos = res.data;
    productsArray = productos.products;
    showProducts();
    /*   productsArray.forEach((producto) => {
      lista_productos.innerHTML += aniadirProducto(producto);
    }); */

    let span_catNombre = document.querySelector("#categoriaNombre");
    span_catNombre.innerHTML += productos.catName;
  } else {
    console.log("Hubo un problema con la petición");
  }

  function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
      result = array.sort(function (a, b) {
        if (a.cost < b.cost) {
          return -1;
        }
        if (a.cost > b.cost) {
          return 1;
        }
        return 0;
      });
    } else if (criteria === ORDER_DESC_BY_COST) {
      result = array.sort(function (a, b) {
        if (a.cost > b.cost) {
          return -1;
        }
        if (a.cost < b.cost) {
          return 1;
        }
        return 0;
      });
    } else if (criteria === ORDER_BY_PROD_SOLD_COUNT) {
      result = array.sort(function (a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

        if (aCount > bCount) {
          return -1;
        }
        if (aCount < bCount) {
          return 1;
        }
        return 0;
      });
    }

    return result;
  }

  function showProducts() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.length; i++) {
      let product = productsArray[i];

      if (
        (minCount == undefined ||
          (minCount != undefined && parseInt(product.cost) >= minCount)) &&
        (maxCount == undefined ||
          (maxCount != undefined && parseInt(product.cost) <= maxCount))
      ) {
        htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="row overflow-hidden shadow rounded mb-4 cursor-active list-group-item-action" >
                <div class="col-3 overflow-hidden p-0">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail img-fluid">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1 mt-1">${product.name}</h4>
                        <small class="text-muted">${product.soldCount} artículos</small>
                    </div>
                    <p class="mb-1 mt-1">${product.description}</p>
                    <p class="mb-1 mt-1">${product.currency} ${product.cost}</p>  
                </div>
            </div>
        
        `;
      }

      document.querySelector(".lista-productos").innerHTML =
        htmlContentToAppend;
    }
  }

  function sortAndShowProducts(sortCriteria, notCurrentProductsArray) {
    currentSortCriteria = sortCriteria;

    if (notCurrentProductsArray != undefined) {
      productsArray = notCurrentProductsArray;
    }

    productsArray = sortProducts(currentSortCriteria, productsArray);

    //Muestro las productos ordenadas
    showProducts();
  }

  document
    .getElementById("sortAscPrice")
    .addEventListener("click", function () {
      sortAndShowProducts(ORDER_ASC_BY_COST);
    });

  document
    .getElementById("sortDescPrice")
    .addEventListener("click", function () {
      sortAndShowProducts(ORDER_DESC_BY_COST);
    });

  document
    .getElementById("sortBySoldCount")
    .addEventListener("click", function () {
      sortAndShowProducts(ORDER_BY_PROD_SOLD_COUNT);
    });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProducts();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showProducts();
    });
});
