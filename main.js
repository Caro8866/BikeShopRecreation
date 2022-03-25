// http://carolinethostrup.dk/Theme09-Content/09.01.02_WP/wp-json/wp/v2/bike?_embed

window.addEventListener("DOMContentLoaded", init);

function init(event) {
  getData();
}

async function getData() {
  let result = await fetch(
    "http://carolinethostrup.dk/Theme09-Content/09.01.02_WP/wp-json/wp/v2/bike?_embed"
  );
  handleProductList(await result.json());
}

function handleProductList(data) {
  data.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);

  /*    <template id="bikeTemplate">
                <article class="bikeCard">
                  <img src="assets/bike_imgs/warhawk.png" alt="" />
                  <h3 class="brandName">State</h3>
                  <h2 class="productName">Warhawk</h2>
                  <div class="specs">
                    <ul>
                      <li>Price - <span class="price">$579</span></li>
                      <li>Colours - <span class="colours">N/A</span></li>
                      <!-- How to show multiple colours? Another list?-->
                      <li>In Stock - <span class="stock">1</span></li>
                      <li><button class="specsButton">FULL SPECS</button></li>
                    </ul>
                  </div>
                </article>
            </template> */

  // GRAB TEMPLATE
  const template = document.querySelector("#bikeTemplate").content;

  // CLONE TEMPLATE
  const copy = template.cloneNode(true);

  // CHANE CONTENT
  copy.querySelector(".productName").textContent = product.title.rendered;
  copy.querySelector(".price").textContent = `$${product.price}`;
  if (product.price2 == true) {
    copy.querySelector(
      ".price"
    ).textContent = `$${product.price} - $${product.price2}`;
  }
  copy.querySelector(".brandName").textContent =
    product._embedded["wp:term"][0][0].name;

  //   console.log(product._links);

  // GRAB PARENT
  const parent = document.querySelector(".cards");

  // APPEND
  parent.appendChild(copy);
}
