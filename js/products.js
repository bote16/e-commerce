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

  let res = await getJSONData(PRODUCTS_URL + catID + ".json");

  if (res.status === "ok") {
    productos = res.data;
    data = productos.products;
    data.forEach((producto) => {
      lista_productos.innerHTML += aniadirProducto(producto);
    });

    let span_catNombre = document.querySelector("#categoriaNombre");
    span_catNombre.innerHTML += productos.catName;
  } else {
    console.log("Hubo un problema con la petición");
  }
});
