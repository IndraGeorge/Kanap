
// fetch product 
const loadingProduct = async () => {
  await fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
          listProducts = data
          return listProducts
      })

      .catch((err) => {
          console.log("fetch err")
          document.getElementById("cart__items").innerHTML += "Panier vide"
      })
}

// array products
let listProducts = [];

// array product cart
let recupBasket = (basket = JSON.parse(localStorage.getItem("basketClient")));


const productsDisplay = async () => {
    await loadingProduct();

    for(let products of recupBasket)
    document
    .getElementById("cart__items")
    .innerHTML += `<article class="cart__item" data-id="" data-color="">
    <div class="cart__item__img">
      <img src="${products.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>${products.colors}</p>
        <p>42,00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

}

productsDisplay();