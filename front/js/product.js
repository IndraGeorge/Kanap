
// Url SearchParams
const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

// On récupère les données des produits
const loadingPageProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            productData = data
            return productData
        })

        .catch((err) => {
            console.log("fetch err")
            // une erreur est survenue
          })
}

// Initialisation d'un tableau 
let productData = [];

// Bouton ajouter au panier
let button = document.getElementById("addToCart");

// Création de la page produit contenant les informations d'un article
const productDisplay = async () => {
    await loadingPageProduct();

    document.title = productData.name

    document
        .querySelector(".item__img")
        .innerHTML += `<img src="${productData.imageUrl}" alt="${productData.altTxt}"></img>`

    document
        .getElementById("title")
        .textContent += productData.name

    document
        .getElementById("price")
        .textContent += productData.price

    document
        .getElementById("description")
        .textContent += productData.description

    // Création d'une boucle pour ajouter les couleurs
    for (let productColors of productData.colors) {
        document
            .getElementById("colors")
            .innerHTML += `<option value="${productColors}">${productColors}</option>`
    }

    addBasket(productData);
};

productDisplay();

// On écoute le bouton ajouter au panier
const addBasket = () => {

    button.addEventListener('click', () => {

        // On pointe l'id "colors" et "quantity" de l'HTML
        let select = document.getElementById("colors");
        let quantity = document.getElementById("quantity");

        // Si une couleur et une quantité sont sélectionnés, on ajoute au panier
        // Si la quantité choisit est supérieur à 0 et inférieur à 100, on ajoute au panier
        if (select.value != "" && quantity != 0 &&
            quantity.value > 0 && quantity.value <= 100) {

            console.log("ajouter au panier")

            //Initialisation d'un tableau pour le local storage
            const cart = {
                _id: productData._id,
                colors: select.value,
                quantity: parseFloat(quantity.value),
            }

            // Initialisation du local storage
            let basket = JSON.parse(localStorage.getItem("basketClient"))

            // On écoute le changement de quantité 
            quantity.addEventListener('change', (e) => {
                if (e.target.value != "" || e.target.value != 0) {
                    quantity = parseInt(e.target.value)
                }
            })

            // Si il n'ya rien dans le local storage, on ajoute le tableau "cart"
            if (basket == null) {
                basket = [];
                basket.push(cart)
                console.table(basket)
                localStorage.setItem("basketClient", JSON.stringify(basket));

                // Si un tableau est déjà présent et c'est le même produit, on incrémente la quantité
            } else if (basket != null) {
                for (i = 0; i < basket.length; i++) {

                    let basketQuantity = basket[i].quantity

                    if (basket[i]._id == productData._id &&
                        basket[i].colors == select.value
                    ) {
                        return (
                            basket[i].quantity = Number(basketQuantity) + Number(cart.quantity),
                            console.log(basketQuantity),
                            localStorage.setItem("basketClient", JSON.stringify(basket)),
                            (basket = JSON.parse(localStorage.getItem("basketClient")))
                        )
                    }

                }
                // Si le produit a un id et une couleur différente,on ajoute un nouveau tableau
                for (i = 0; i < basket.length; i++) {
                    if (basket[i]._id == productData._id &&
                        basket[i].colors != select.value ||
                        basket[i]._id != productData._id
                    ) {
                        return (
                            console.log("new"),
                            basket.push(cart),
                            localStorage.setItem("basketClient", JSON.stringify(basket)),
                            (basket = JSON.parse(localStorage.getItem("basketClient")))
                        )
                    }
                }
            }
            
        } else {

            alert("Veuillez saisir une couleur et une quantité comprise entre 1 et 100")
        }
    })
    return (basket = JSON.parse(localStorage.getItem("basketClient")))
}



