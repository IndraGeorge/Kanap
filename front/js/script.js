// call API with Fetch

let products = [];

async function loadingPageHome() {
   await fetch("http://localhost:3000/api/products ")
   .then((res) => res.json())
    .then((data) => {
      products = data;        
      return products
    }
    )

    .catch ((err) => {
      console.log("fetch err")
      // une erreur est survenue
      document.getElementById("items").innerHTML += "Nos produits sont indisponibles pour le moment"
    })
}


// home page containing API products

const productsDisplay = async () => {
  await loadingPageHome();

for (let listProduct of products) {
  document
    .getElementById("items")
    .innerHTML += `<a href="./product.html?id=${listProduct._id}">
          <article>
            <img src="${listProduct.imageUrl}" alt="${listProduct.altTxt}">
            <h3 class="productName">${listProduct.name}</h3>
            <p class="productDescription">${listProduct.description}</p>
          </article>
        </a>`
 }

}


productsDisplay();


