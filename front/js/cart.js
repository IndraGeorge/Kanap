// On récupère les données du local storage 
let cart = JSON.parse(localStorage.getItem("basketClient"));

//******************************************************************************************** */

// Si le local storage est vide on affiche "panier vide" sinon on insère les données du produit
async function productsInLocalStorage() {

  if (cart == null) {

    console.log("Votre panier est vide");
    let items = document.querySelector("#cart__items");
    items.innerHTML = "<h3> Votre panier est vide </h3>";
    items.style.textAlign = "center";
    items.style.fontSize = "18px";

  } else {

    await fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {

        // On récupère les données des produits présents dans le local storage
        for (i = 0; i < cart.length; i++) {

          let id = cart[i]._id
          let quantity = cart[i].quantity;
          let colors = cart[i].colors;

          // On récupère que les produits qui correspondent à ceux présents dans le local storage
          const dataCart = data.find((element) => element._id === id)

          // Initialisation des variables des données de l'API
          let price = dataCart.price
          let image = dataCart.imageUrl;
          let name = dataCart.name;
          let altTxt = dataCart.altTxt

          // On pointe l'id "cart__items" pour insérer le résumé du panier dans le DOM
          let items = document.querySelector("#cart__items")

          // Création de l'article "cart__item"
          let article = document.createElement("article");
          article.setAttribute("class", "cart__item");
          article.setAttribute("data-id", id);
          article.setAttribute("data-color", colors);
          items.appendChild(article);

          // Création de la div "cart__item__img"
          let divImg = document.createElement("div");
          divImg.setAttribute("class", "cart__item__img");
          article.appendChild(divImg);

          // Création de la balise image
          let img = document.createElement("img");
          img.setAttribute("src", image);
          img.setAttribute("alt", altTxt);
          divImg.appendChild(img);

          // Création de la div "cart__item__content"
          let divContent = document.createElement("div");
          divContent.setAttribute("class", "cart__item__content");
          article.appendChild(divContent);

          // Création de la div "cart__item__content__description"
          let divContentDescription = document.createElement("div");
          divContentDescription.setAttribute("class", "cart__item__content__description");
          divContent.appendChild(divContentDescription);

          // Création d'une balise titre h2 qui indique le nom
          let h2 = document.createElement("h2");
          h2.textContent = name;
          divContentDescription.appendChild(h2);

          // Création d'une balise p qui indique la couleur
          let color = document.createElement("p");
          color.textContent = colors;
          divContentDescription.appendChild(color);

          // Création d'une balise p qui indique le prix 
          let priceP = document.createElement("p");
          priceP.textContent = price + " €";
          divContentDescription.appendChild(priceP);

          // Création de la div "cart__item__content__settings"
          let divContentSettings = document.createElement("div");
          divContentSettings.setAttribute("class", "cart__item__content__settings");
          divContent.appendChild(divContentSettings);

          // Création de la div "cart__item__content__settings__quantity"
          let divContentSettingsQuantity = document.createElement("div");
          divContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
          divContentSettings.appendChild(divContentSettingsQuantity);

          // Création d'une balise p qui indique le texte "Qté"
          let quantityP = document.createElement("p");
          quantityP.textContent = "Qté :";
          divContentSettingsQuantity.appendChild(quantityP);

          // Création d'une balise input ayant pour classe "itemQuantity" 
          let inputQuantity = document.createElement("input");
          inputQuantity.setAttribute("type", "number");
          inputQuantity.setAttribute("class", "itemQuantity");
          inputQuantity.setAttribute("name", "itemQuantity");
          inputQuantity.setAttribute("min", "1");
          inputQuantity.setAttribute("max", "100");
          inputQuantity.setAttribute("value", quantity);
          divContentSettingsQuantity.appendChild(inputQuantity);

          // Création de la div "cart__item__content__settings__delete"
          let divContentSettingsDelete = document.createElement("div");
          divContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
          divContentSettings.appendChild(divContentSettingsDelete);

          // Création d'une balise p qui indique le prix 
          let deleteP = document.createElement("p");
          deleteP.setAttribute("class", "deleteItem");
          deleteP.innerText = "Supprimer";
          divContentSettingsDelete.appendChild(deleteP);

          moreQuantity();
          deleteProduct();
        }
      })

      .catch((err) => {
        console.log("fetch err")
        alert("Une erreur est survenue lors du chargement du panier");
        // Une erreur est survenue
      });

  }

}

productsInLocalStorage();

//********************************************************************************************* */

// Calcul de la quantité total présent dans le panier
function changeTotalQuantity() {

  if (cart != null) {

    let totalQuantity = document.getElementById("totalQuantity");
    const totalProducts = cart.reduce((acc, val) => acc + val.quantity, 0);
    totalQuantity.textContent = totalProducts;

  }
}

changeTotalQuantity();

//********************************************************************************************* */

// Calcul du prix total du panier
async function changeTotalPrice() {

  if (cart != null) {

    await fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {

        // On déclare une variable "total" avec une valeur de 0
        let total = 0;
        
        // On récupère l'id et la quantité dans le local storage
        for (i = 0; i < cart.length; i++) {

          let id = cart[i]._id;
          let quantity = cart[i].quantity;
          
          // On récupère que les données des produits présents dans le local storage
          const dataCart = data.find((element) => element._id === id)
          let price = dataCart.price;

          let productsPrice = quantity * price;
          total += productsPrice;
          let totalPrice = document.getElementById("totalPrice");
          totalPrice.textContent = total;

        }
      })
  }
}

changeTotalPrice();

//********************************************************************************************* */

// Ajouter ou supprimer des quantités 
function moreQuantity() {

  let input = document.querySelectorAll(".itemQuantity");

  input.forEach((changeQuantity) => {

    // On écoute l'input "itemQuantity"
    changeQuantity.addEventListener("change", (e) => {

      inputQuantity = Number(changeQuantity.value);

      // On remonte à l'élément parent
      let article = changeQuantity.closest("article");

      for (i = 0; i < cart.length; i++) {
        let id = cart[i]._id;
        let colors = cart[i].colors;

        // Si la veleur saisit est supérieure à 0 ou inférieur à 100 et c'est un nombre entier, on ajoute au panier
        if (inputQuantity > 0 && inputQuantity <= 100 && Number.isInteger(inputQuantity)) {

          if (id == article.dataset.id && colors == article.dataset.color) {

            cart[i].quantity = inputQuantity;
            //console.log("ajout panier");
            localStorage.setItem("basketClient", JSON.stringify(cart));
            changeTotalQuantity();
            changeTotalPrice();
          }

        } else {
          alert("Veuillez choisir une quantité supérieure à 0 et inférieure ou égale à 100");
        }
      }

    })
  })

}

//********************************************************************************************* */

// Supprimer un produit dans le DOM et dans le local storage
function deleteProduct() {

  let deleteItem = document.querySelectorAll(".deleteItem");

  deleteItem.forEach(buttonDelete => {

    buttonDelete.addEventListener("click", (e) => {
      e.preventDefault()

      // On remonte à l'élément parent
      let article = buttonDelete.closest("article");

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

// Prénom et message d'erreur
const firstName = document.getElementById("firstName")
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")

// Nom et message d'erreur
const lastName = document.getElementById("lastName")
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")

// Adresse et message d'erreur
const address = document.getElementById("address")
const addressErrorMsg = document.getElementById("addressErrorMsg")

// Ville et message d'erreur
const city = document.getElementById("city")
const cityErrorMsg = document.getElementById("cityErrorMsg")

// Email et message d'erreur
const email = document.getElementById("email")
const emailErrorMsg = document.getElementById("emailErrorMsg")

// Id bouton commander
let buttonOrder = document.getElementById("order")

// Création des expressions régulières pour contrôler les informations entrées par l'utilisateur
let regexLeter = new RegExp("^[\-a-zA-Zéèîëïäöüçâ ]{3,30}$");
let regexLeterAndNumber = new RegExp("^[a-zA-Z0-9éèîëïäöüçâ .,-]{3,50}$");
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
    firstNameErrorMsg.innerHTML =
      "Merci de saisir votre prénom sans chiffre ni caractères spéciaux"
  }

})

// On écoute l'input "lastName"
lastName.addEventListener("change", () => {

  lastNameValue = regexLeter.test(lastName.value)

  if (lastNameValue) {

    //console.log(lastNameValue);
    lastNameErrorMsg.innerHTML = ""

  } else {
    lastNameErrorMsg.innerHTML =
      "Merci de saisir votre nom sans chiffre ni caractères spéciaux"
  }

})

// On écoute l'input "address"
address.addEventListener("change", () => {

  addressValue = regexLeterAndNumber.test(address.value)

  if (addressValue) {

    //console.log(addressValue);
    addressErrorMsg.innerHTML = ""

  } else {
    addressErrorMsg.innerHTML =     
      "Votre adresse doit contenir au moins 3 caractères et aux plus 50 caractères"
  }

})

// On écoute l'input "city"
city.addEventListener("change", () => {

  cityValue = regexLeter.test(city.value)

  if (cityValue) {

    //console.log(cityValue);
    cityErrorMsg.innerHTML = ""

  } else {
    cityErrorMsg.innerHTML =
      "Merci d'indiquer le nom de votre ville sans chiffres ou caractères spéciaux"
  }

})

// On écoute l'input "email"
email.addEventListener("change", () => {

  emailValue = regexEmail.test(email.value)

  if (emailValue) {

    //console.log(emailValue);
    addressErrorMsg.innerHTML = ""

  } else {
    emailErrorMsg.innerHTML = "Merci d'entrer une adresse e-mail valide"
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
      alert("Veuillez remplir tous les champs du formulaire correctement")

    }
  }
})
// Fin de l'écoute


