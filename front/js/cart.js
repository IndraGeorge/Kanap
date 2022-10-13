let cart = JSON.parse(localStorage.getItem("basketClient"))

// condition if there is nothing in local storage

const productsInLocalStorage = () => {

  if (cart == null) {

    console.log("Votre panier est vide")

  } else {

    for (i = 0; i < cart.length; i++) {

      let id = cart[i]._id;
      let quantity = cart[i].quantity;
      let colors = cart[i].colors;


      fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          
          let image = data.imageUrl
          let name = data.name
          let price = data.price * quantity

          let items = document.querySelector("#cart__items")
          //Create article
          items.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${colors}">
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

          plusQuantity(data);
          
        })

    }

  }

}

productsInLocalStorage()


//total quantity

let totalQuantity = document.getElementById("totalQuantity")

const totalProducts = cart.reduce((acc, val) => acc + val.quantity, 0)

totalQuantity.textContent = totalProducts

// total price 

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

// Increase and reduce products

function plusQuantity() {

  let input = document.querySelectorAll(".itemQuantity")

  input.forEach((changeQuantity) => {

    changeQuantity.addEventListener("change", (e) => {

      inputQuantity = Number(changeQuantity.value);
      console.log(inputQuantity);

      let article = changeQuantity.closest("article");

      console.log(article);

      for (i = 0; i < cart.length; i++) {
        let id = cart[i]._id
        let colors = cart[i].colors
        let quantity = cart[i].quantity

        if (id == article.dataset.id && colors == article.dataset.color) {

            quantity = inputQuantity
            console.log("ajout panier"),
            localStorage.setItem("basketClient", JSON.stringify(cart)),
            document.querySelectorAll(".itemQuantity")[i].textContent = quantity,
            document.querySelectorAll("#totalPrice")[i].textContent = quantity * data.price
            changeTotalQuantity()
          
        }

      }

    })
  })

}

// New total quantity

function changeTotalQuantity() {

  let totalQuantity = document.getElementById("totalQuantity")

  const totalProducts = cart.reduce((acc, val) => acc + val.quantity, 0)

  totalQuantity.textContent = totalProducts

}




