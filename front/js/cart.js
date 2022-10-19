// On récupère les données du local storage 
let cart = JSON.parse(localStorage.getItem("basketClient"))

//******************************************************************************************** */

// Si le local storage est vide on affiche "panier vide" sinon on insère les données du produit
const productsInLocalStorage = () => {

  if (cart == null) {

    console.log("Votre panier est vide")
    let items = document.querySelector("#cart__items");
    items.innerHTML = "<h3> Votre panier est vide </h3>";
    items.style.textAlign = "center";
    items.style.fontSize = "18px"
    
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

          // Création de l'article
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

          moreQuantity();
          deleteProduct();

        })

        .catch((err) => {
          console.log("fetch err")
          alert("Une erreur est survenue lors du chargement du panier")
          // Une erreur est survenue
        })

    }

  }

}

productsInLocalStorage()

//********************************************************************************************* */

// Calcul de la quantité total présent dans le panier
const changeTotalQuantity = () => {

  if (cart != null) {

    let totalQuantity = document.getElementById("totalQuantity")
    const totalProducts = cart.reduce((acc, val) => acc + val.quantity, 0)
    totalQuantity.textContent = totalProducts

  }
}

changeTotalQuantity()

//********************************************************************************************* */

// Calcul du prix total du panier
const changeTotalPrice = () => {

  if (cart != null) {

    let total = 0;

    for (i = 0; i < cart.length; i++) {

      let id = cart[i]._id;
      let quantity = cart[i].quantity

      fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {

          let price = data.price

          let productsPrice = quantity * price
          total += productsPrice
          let totalPrice = document.getElementById("totalPrice")
          totalPrice.textContent = total

          let priceItem = document.querySelectorAll(".cart__item__content__description p")[1]
          priceItem.textContent = `${productsPrice} €`
          console.log(priceItem);

        })
    }
  }
}

changeTotalPrice()

//********************************************************************************************* */

// Ajouter ou supprimer des quantités 
const moreQuantity = () => {

  let input = document.querySelectorAll(".itemQuantity")

  input.forEach((changeQuantity) => {

    // On écoute l'input ".itemQuantity"
    changeQuantity.addEventListener("change", (e) => {

      inputQuantity = Number(changeQuantity.value);

      // On remonte à l'élément parent
      let article = changeQuantity.closest("article");

      for (i = 0; i < cart.length; i++) {
        let id = cart[i]._id
        let colors = cart[i].colors

        // Si la veleur saisit est supérieure à 0 ou inférieur à 100 et c'est un nombre entier, on ajoute au panier
        if (inputQuantity > 0 && inputQuantity < 100 && Number.isInteger(inputQuantity)) {

          if (id == article.dataset.id && colors == article.dataset.color) {

            cart[i].quantity = inputQuantity
            //console.log("ajout panier"),
            localStorage.setItem("basketClient", JSON.stringify(cart));
            changeTotalQuantity()
            changeTotalPrice()
          }

        } else {

          alert("Veuillez choisir une quantité comprise entre 1 et 100")

        }
      }

    })
  })

}

//********************************************************************************************* */

// Supprimer un produit dans le DOM et dans le local storage
const deleteProduct = () => {

  let deleteItem = document.querySelectorAll(".deleteItem")

  deleteItem.forEach(buttonDelete => {

    buttonDelete.addEventListener("click", (e) => {
      e.preventDefault()

      // On remonte à l'élément parent
      let article = buttonDelete.closest('article')

      // On filtre les produits ayant un id et une couleur différente
      cart = cart.filter(
        element => {
          return article.dataset.id !== element._id || article.dataset.color !== element.colors;
        }
      )

      localStorage.setItem("basketClient", JSON.stringify(cart))

      // S'il y a aucun produit dans le local storage, on supprime le tableau
      if (cart == null || cart == 0) {
        localStorage.removeItem("basketClient");
      }
      // On recharge la page après la suppression d'un produit
      document.location.reload();
    })

  });

}

//********************************************************************************************* */

// Formulaire de contact

// Initialisation des variables 

// Id prénom et message d'erreur
const firstName = document.getElementById("firstName")
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")

// Id nom et message d'erreur
const lastName = document.getElementById("lastName")
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")

// Id adresse et message d'erreur
const address = document.getElementById("address")
const addressErrorMsg = document.getElementById("addressErrorMsg")

// Id ville et message d'erreur
const city = document.getElementById("city")
const cityErrorMsg = document.getElementById("cityErrorMsg")

// Id email et message d'erreur
const email = document.getElementById("email")
const emailErrorMsg = document.getElementById("emailErrorMsg")

// Id bouton envoyer
let buttonOrder = document.getElementById("order")

// Création des expressions régulières pour contrôler les informations entrées par l'utilisateur
let regexLeter = new RegExp("^[\-a-zA-Zéèîëïäöüçâ ]{3,30}$");
let regexLeterAndNumber = new RegExp("^[0-9]{1,3} [a-zA-Zéèîëïäöüçâ.,-]{3,30}");
let regexEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$")

// Initialisation des variables pour récupérer les valeurs des inputs
let firstNameValue, lastNameValue, addressValue, cityValue, emailValue;

// On écoute l'input "firstName"
firstName.addEventListener("change", () => {

  firstNameValue = regexLeter.test(firstName.value)
  
  if (firstNameValue) {

    //console.log(firstNameValue);
    firstNameErrorMsg.innerHTML = ""

  } else {
    firstNameErrorMsg.innerHTML = "Veuillez renseigner votre prénom"
  }

})

// On écoute l'input "lastName"
lastName.addEventListener("change", () => {

  lastNameValue = regexLeter.test(lastName.value)

  if (lastNameValue) {

    //console.log(lastNameValue);
    lastNameErrorMsg.innerHTML = ""

  } else {
    lastNameErrorMsg.innerHTML = "Veuillez renseigner votre nom"
  }

})

// On écoute l'input "address"
address.addEventListener("change", () => {

  addressValue = regexLeterAndNumber.test(address.value)

  if (addressValue) {

    //console.log(addressValue);
    addressErrorMsg.innerHTML = ""

  } else {
    addressErrorMsg.innerHTML = "Veuillez renseigner votre addresse"
  }

})

// On écoute l'input "city"
city.addEventListener("change", () => {

  cityValue = regexLeter.test(city.value)

  if (cityValue) {

    //console.log(cityValue);
    cityErrorMsg.innerHTML = ""

  } else {
    cityErrorMsg.innerHTML = "Veuillez renseigner la ville"
  }

})

// On écoute l'input "email"
email.addEventListener("change", () => {

  emailValue = regexEmail.test(email.value)

  if (emailValue) {

    //console.log(emailValue);
    addressErrorMsg.innerHTML = ""

  } else {
    emailErrorMsg.innerHTML = "Veuillez renseigner votre email"
  }

})

// Si le panier est vide, on invite l'utilisateur à ajouter des produits dans son panier
// Si le panier n'est pas vide et les champs du formulaire sont correctement renseignés, on valide la commande
// On écoute le bouton commander
buttonOrder.addEventListener("click", (e) => {
  e.preventDefault()

  if (cart == null || cart == 0) {
    alert("Veuillez ajouter des produits dans votre panier")
  }
  else {

    if (firstNameValue && lastNameValue && addressValue && cityValue && emailValue) {
      console.log("envoie")
      const order = JSON.parse(localStorage.getItem("basketClient"))
      let orderId = []

      order.forEach((products) => {
        orderId.push(products._id);
      })
      //console.log(orderId)

      // Création d'un tableau contenant les informations renseignées par l'utilisateur 
      const contact = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value
        },
        products: orderId,
      };

      //console.log(contact);
      // On envoie les données stockées dans contact au serveur 
      const response = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      };

      fetch("http://localhost:3000/api/products/order", response)
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);

          // On redirige l'utilisateur vers la page de confirmation avec son numéro de commande
          document.location.href = `confirmation.html?orderId=${data.orderId}`
        })

        .catch((err) => {
          console.log(err);
          alert("Une erreur est survenue lors de l'envoi du formulaire")
        })

        localStorage.removeItem("basketClient");

    } else {
      alert("Veuillez remplir tout les champs du formulaire correctement")

    }
  }
})

// Fin de l'écoute


