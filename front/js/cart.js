let cart = JSON.parse(localStorage.getItem("basketClient"))

// condition if there is nothing in local storage
if (cart == null) {

  console.log("Votre panier est vide")

} else {

  cart


  for (i = 0; i < cart.length; i++) {

    let id = cart[i]._id;
    let quantity = cart[i].quantity;
    let colors = cart[i].colors;


    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {

        let items = document.getElementById("cart__items");

        items.innerHTML +=
          `<article class="cart__item" data-id="${id}" data-color="${colors}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${colors}</p>
                    <p>${data.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`

      })

      .catch((err) => {
        console.log("fetch err")
      })

  }

}

// total quantity
let totalQuantity = document.getElementById("totalQuantity")

const totalProducts = cart.reduce((acc, val) => acc + val.quantity, 0)

totalQuantity.textContent = totalProducts


// total price
let totalPrice = document.getElementById("totalPrice")
for (i = 0; i < cart.length; i++) {

let id = cart[i]._id

fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {

        let price = data.price
        
let total = data.price * totalQuantity

console.log(total)

totalPrice.textContent

      })

    }