// http://carolinethostrup.dk/Theme09-Content/09.01.02_WP/wp-json/wp/v2/bike?_embed

window.addEventListener("DOMContentLoaded", init);

function init(event) {
  getData();
}

async function getData() {
  let result = await fetch(
    "https://carolinethostrup.dk/Theme09-Content/09.01.02_WP/wp-json/wp/v2/bike?_embed"
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

  // product price 1
  copy.querySelector(".price").textContent = `$${product.price}`;

  // product price 2
  if (product.price2 > 1) {
    copy.querySelector(
      ".price"
    ).textContent = `$${product.price} - $${product.price2}`;
  }
  // brand name
  copy.querySelector(".brandName").textContent =
    product._embedded["wp:term"][0][0].name;
  // image
  copy
    .querySelector("img")
    .setAttribute(
      "src",
      product._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large
        .source_url
    );

  // stock
  copy.querySelector(".stock").textContent = product.stock_amount;
  if (product.stock_amount == 0) {
    copy.querySelector(".stock").textContent = "No";
  } else if (product.stock_amount == 3) {
    copy.querySelector(".stock").textContent = "Yes";
  }
  // colour
  // Dover 1 or 5
  if (product.id === 43) {
    copy.querySelector(".black").classList.remove("hidden");
    copy.querySelector(".white").classList.remove("hidden");
  }

  // Dutchi 1
  if (product.id === 42) {
    copy.querySelector(".black").classList.remove("hidden");
    copy.querySelector(".white").classList.remove("hidden");
    copy.querySelector(".red").classList.remove("hidden");
    copy.querySelector(".blue").classList.remove("hidden");
    copy.querySelector(".green").classList.remove("hidden");
  }

  // Mixte 3 or 8
  if (product.id === 40) {
    copy.querySelector(".turquoise").classList.remove("hidden");
    copy.querySelector(".white").classList.remove("hidden");
    copy.querySelector(".darkred").classList.remove("hidden");
  }

  //Dutchie 3 or 8
  if (product.id === 38) {
    copy.querySelector(".black").classList.remove("hidden");
    copy.querySelector(".white").classList.remove("hidden");
    copy.querySelector(".red").classList.remove("hidden");
    copy.querySelector(".blue").classList.remove("hidden");
    copy.querySelector(".green").classList.remove("hidden");
  }
  // Cardinal
  if (product.id === 37) {
    copy.querySelector(".na").classList.remove("hidden");
  }
  // Warhawk
  if (product.id === 36) {
    copy.querySelector(".na").classList.remove("hidden");
  }

  //   console.log(product._links);

  // GRAB PARENT
  const parent = document.querySelector(".cards");

  // APPEND
  parent.appendChild(copy);
}
