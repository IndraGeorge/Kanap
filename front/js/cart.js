//return the localStorage of cart in json
const getItemsFromBasket = () => {
  return (JSON.parse(localStorage.getItem("basketClient")))
}

let cart = getItemsFromBasket();

// Show products in cart 
const cartDisplay = async () => {

  if (cart.length > 0 ) {

    for (let products of cart) {

      await fetch(`http://localhost:3000/api/products/${products._id}`)
        .then(res => res.json())
        .then(data => {

          let image = data.imageUrl;
          let name = data.name;
          let price = data.price;
          let total = price * products.quantity;

            document.getElementById("cart__items").innerHTML +=
              `<article class="cart__item" data-id="${products._id}" data-color="${products.colors}">
                <div class="cart__item__img">
                  <img src="${image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${products.colors}</p>
                    <p>${price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
          
        })
        .catch(function (err) {
          console.log("erreur")
        })
    }
  } else {

    console.log("Votre panier est vide :(");
  }

  return (localStorage.setItem("basketClient", JSON.stringify(cart)))
}

cartDisplay();