function aniadirProducto(producto) {
  return `
    <div class="row shadow rounded overflow-hidden mb-4">
      <div class="col-sm-6 col-md-4 col-lg-8 p-0 overflow-hidden">
        <img src="${producto.image}" alt="imgAUTO" class=" img-fluid">
      </div>
      <div class="col mt-1">
        <h4>${producto.name}</h4>
        <p>${producto.description}</p>
        <div class="row">
        <div class="col">
          <span class="moneda">${producto.currency}</span>
          <span class="precio">${producto.cost}</span>
        </div>
        <div class="col">
          <p>Vendidos: <span class="cant_vendidos">${producto.soldCount}</span></p>
        </div>
      </div>
    </div>
  `;
}

let catID = localStorage.getItem("catID");

var productos = null;

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
    productsArray.forEach((producto) => {
      lista_productos.innerHTML += aniadirProducto(producto);
    });

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
        <div class="row shadow rounded overflow-hidden mb-4">
        <div class="col-sm-6 col-md-4 col-lg-8 p-0 overflow-hidden">
          <img src="${product.image}" alt="imgAUTO" class=" img-fluid">
        </div>
        <div class="col mt-1">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <div class="row">
          <div class="col">
            <span class="moneda">${product.currency}</span>
            <span class="precio">${product.cost}</span>
          </div>
          <div class="col">
            <p>Vendidos: <span class="cant_vendidos">${product.soldCount}</span></p>
          </div>
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
