let productID = localStorage.getItem("productID");
const btnForm = document.getElementById("sendComment");
const RELATED_PROD_CNT = document.getElementById("relatedProducts");
var related_products = [];

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
    getRelatedProducts();
    showRelatedProducts();
  }

  let res_comment = await getJSONData(
    PRODUCT_INFO_COMMENTS_URL + productID + ".json"
  );
  if (res_comment.status === "ok") {
    comments = res_comment.data; //array --
    showCommentInfo();
  }

  // Poner la info del producto en lo contenedores
  prodName.innerText = product.name;
  prodPrice.innerText = product.currency + " " + product.cost;
  prodSoldCount.innerText = product.soldCount;
  prodDescription.innerText = product.description;
  prodCategory.innerText = product.category;

  console.log(product.relatedProducts);

  //conseguir el array de products relacionados y almacenarlos en var
  function getRelatedProducts() {
    for (i = 0; i < product.relatedProducts.length; i++) {
      related_products.push(product.relatedProducts[i]);
    }
  }

  //imprimir las img en un div y agregar un on click
  function showRelatedProducts() {
    let HTMLContentToAppend = "";

    for (let i = 0; i < related_products.length; i++) {
      let relatedProdItem = related_products[i];

      HTMLContentToAppend += `<div onclick="setProductID(${relatedProdItem.id})" 
      class="col overflow-hidden shadow rounded mb-4 mt-4 cursor-active border border-dark">
      <div class="p-0">
                    <img src="${relatedProdItem.image}" alt="${relatedProdItem.name}" class="img-fluid">
                    <p>${relatedProdItem.name}</p>
                </div></div>`;
    }
    RELATED_PROD_CNT.innerHTML = HTMLContentToAppend;
  }

  //Mostrar los elementos del array de fotos
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

  //Mostrar la información de los comentarios del producto y calificación
  function showCommentInfo() {
    let htmlContentToAppend = "";

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];

      //funcion para los comentarios y el llenado segun score

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

  //Formulario comentario
  btnForm.addEventListener("click", () => {
    const form = document.getElementById("make-comment-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const descComment = form.querySelector("#descripcion");
      const scoreComment = form.querySelector("#score");

      if (descComment.value != "" && scoreComment.value != "") {
        let comentario = new Object();
        var date = new Date(); //objeto Date para poder usar la propiedad dateTime en el new Obj
        var current_date =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        var current_time =
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        //propiedades del Objeto
        comentario.description = descComment.value;
        comentario.score = scoreComment.value;
        comentario.user = INFO_USER;
        comentario.dateTime = current_date + " " + current_time;

        //sumar el comentario
        let HTMLContentToAppend = "";

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

        HTMLContentToAppend += `
        <div class="p-2 mt-2 overflow-hidden shadow rounded cursor-active">
              <div class="row">
                <div class="col">
                  <p class="fst-italic fw-bold">${comentario.user} - ${
          comentario.dateTime
        }</p>
                </div>
              </div>
              <div class="row">
                <p class="fst-italic">${comentario.description}</p>
              </div>
              <div class="row">
              <p>${starsFill(comentario.score)}</p> 
              </div>
            </div>
    `;
        cntComments.innerHTML += HTMLContentToAppend;

        //Limitar la cantidad de comentarios por usuario a 1
        btnForm.setAttribute("disabled", "");

        comments.push(comentario); //añadirlo al array de comentarios
      } else {
        //asegurar que el comentario tenga contenido
        alert("Por favor ingrese contenido en el comentario");
      }
    });
  });
});

function fillStars() {
  //esto puede servir para la parte 4, cuando el usuario clickea que haga fill o quite. Crear queryselector con clase fa-stars, la otra se usa para el fetch de comment
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
