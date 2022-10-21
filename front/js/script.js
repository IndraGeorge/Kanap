// Appel de l'API avec la méthode fetch
let products = [];
async function loadingPageHome() {
  await fetch("http://localhost:3000/api/products ")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      return products
    })   
    .catch((err) => {
      console.log("fetch err")
      // Une erreur est survenue
      document.getElementById("items").innerHTML = "<h3> Nos produits sont indisponibles pour le moment </h3>"
    })
}

// Récupération des données de l'API pour l'afficher sur la page d'accueil
const productsDisplay = async () => {
  await loadingPageHome();

  for (let listProduct of products) {
    
    let items = document.querySelector("#items");

    // Création de la balise a
    let link = document.createElement("a")
    link.setAttribute("href", `./product.html?id=${listProduct._id}`)
    items.appendChild(link)

    // Création de la balise article
    let article = document.createElement("article")
    link.appendChild(article)

    // Création de la balise img et insertion des images 
    let img = document.createElement("img")
    img.setAttribute("src",listProduct.imageUrl )
    img.setAttribute ("alt", listProduct.altTxt)
    article.appendChild(img)

    // Création de la balise h3 et insertion du nom du produit
    let h3 = document.createElement("h3")
    h3.setAttribute("class","productName")
    h3.textContent = listProduct.name
    article.appendChild(h3)

    // Créationde la balise p et insertion de la description
    let p = document.createElement("p")
    p.setAttribute("class","productDescription")
    p.textContent = listProduct.description
    article.appendChild(p)
  }

}

productsDisplay();


// let article = document.createElement("items");
//           article.setAttribute("class", "cart__item");
//           article.setAttribute("data-id", id);
//           article.setAttribute("data-color", colors);
//           items.appendChild(article);


          // document
          // .getElementById("items")
          // .innerHTML += `<a href="./product.html?id=${listProduct._id}">
          //     <article>
          //       <img src="${listProduct.imageUrl}" alt="${listProduct.altTxt}">
          //       <h3 class="productName">${listProduct.name}</h3>
          //       <p class="productDescription">${listProduct.description}</p>
          //     </article>
          //   </a>`