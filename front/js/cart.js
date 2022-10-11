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

    let urlProducts = `http://localhost:3000/api/products/${id}`
    fetch(urlProducts)
      .then((res) => res.json())
      .then((data) => {

        let image = data.imageUrl
        let name = data.name
        let price = data.price * quantity

        let items = document.getElementById("cart__items");

        items.innerHTML +=
          `<article class="cart__item" data-id="${id}" data-color="${colors}">
                <div class="cart__item__img">
                  <img src="${image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${colors}</p>
                    <p>${price}€</p>
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

let total = 0;

for (i = 0; i < cart.length; i++) {

  let id = cart[i]._id;
  let quantity = cart[i].quantity

  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => {

      let price = data.price
        
          productsPrice = quantity * price
          total += productsPrice 
          let totalPrice = document.getElementById("totalPrice")
          totalPrice.textContent = total
         
    })

}

// increase and reduce quantity

let itemQuantity = document.querySelector(".cart__item")
console.log(itemQuantity)

