// home page containing API products
let product = [];


  fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        product = data;
        for (let listProduct of product) {
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
    });
    




