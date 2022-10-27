
// On récupère l'id du produit pour afficher un seul produit
const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

// On récupère les données du produit
async function loadingPageProduct() {
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            productData = data
            return productData
        })
        .catch((err) => {
            console.log("fetch err")
            alert("Une erreur est survenue,veuillez nous excuser du désagrément")
            // Une erreur est survenue
        })
}

// Initialisation d'un tableau 
let productData = [];

// Création de la page produit contenant les informations
const productDisplay = async () => {
    await loadingPageProduct();

    document.title = productData.name

    // Création de la balise img
    let itemImg = document.querySelector(".item__img")
    let img = document.createElement("img");
    img.setAttribute("src", productData.imageUrl);
    img.setAttribute("alt", productData.altTxt);
    itemImg.appendChild(img);

    // Le nom du produit est ajouté
    document.getElementById("title")
        .textContent = productData.name

    // Le prix du produit est ajouté
    document.getElementById("price")
        .textContent = productData.price

    // La description du produit est ajoutée
    document.getElementById("description")
        .textContent = productData.description

    // Création d'une boucle pour ajouter les couleurs
    for (let productColors of productData.colors) {

        let optionColors = document.getElementById("colors")
        optionColors.value.textContent += productColors
        let option = document.createElement("option")
        option.setAttribute("value", productColors)
        optionColors.appendChild(option)
        option.textContent += productColors
    }

    addBasket(productData);
};

productDisplay();

// Bouton ajouter au panier
let button = document.getElementById("addToCart");

// On écoute le bouton ajouter au panier
const addBasket = () => {

    button.addEventListener("click", () => {

        // On pointe l'id "colors" 
        let select = document.getElementById("colors");

        // Si une couleur est sélectionner de nouveau, on affiche sur le bouton "Ajouter au panier"
        select.addEventListener("click", () => {
            button.textContent = "Ajouter au panier"
            button.style.color = "white"
        })

        // On pointe l'id "quantity"
        let quantity = document.getElementById("quantity");
        let quantityValue = Number(quantity.value)
        // Si une couleur et une quantité sont sélectionnées, on ajoute au panier
        // Si la quantité choisit est supérieure à 0 et inférieur à 100, on ajoute au panier
        if (select.value != "" && quantity != 0 &&
            quantityValue > 0 && quantityValue <= 100 && Number.isInteger(quantityValue)) {

            console.log("ajouter au panier")

            // Initialisation d'un tableau pour le local storage
            const cart = {
                _id: productData._id,
                colors: select.value,
                quantity: quantityValue,
            }

            // Initialisation du local storage
            let basket = JSON.parse(localStorage.getItem("basketClient"))

            // On écoute le changement de quantité 
            quantity.addEventListener("change", (e) => {
                if (e.target.value != "" || e.target.value != 0) {
                    quantity = parseInt(e.target.value)
                    button.textContent = "Ajouter au panier"
                    button.style.color = "white"
                }
            })

            // S'il n'y a rien dans le local storage, on ajoute le tableau "cart"
            if (basket == null) {
                basket = [];
                basket.push(cart)
                //console.log(basket)
                button.textContent = "Produit ajouté"
                button.style.color = "#00FF00"
                localStorage.setItem("basketClient", JSON.stringify(basket));

                // Si un tableau est déjà présent et c'est le même produit, on augmente la quantité
            } else if (basket != null) {
                for (i = 0; i < basket.length; i++) {

                    let basketQuantity = basket[i].quantity
                    let sumQuantity = Number(basketQuantity) + Number(cart.quantity)

                    if (basket[i]._id == productData._id &&
                        basket[i].colors == select.value
                    ) {
                        // On limite le nombre d'unité par produit à 100
                        if (sumQuantity > 100 ){
                        
                            sumQuantity = 100
                            alert ("Vous avez atteint un maximum de 100 unités pour chaque produit")
                        }
                                                                              
                        return (
                            basket[i].quantity = sumQuantity,
                            console.log(basket[i].quantity),
                            button.textContent = "Produit ajouté",
                            button.style.color = "#00FF00",
                            localStorage.setItem("basketClient", JSON.stringify(basket)),
                            (basket = JSON.parse(localStorage.getItem("basketClient")))
                        ) 
                                         
                    } 
                  
                }
                // Si le produit a un id et/ou une couleur différente, on ajoute un nouveau tableau
                for (i = 0; i < basket.length; i++) {
                    if (basket[i]._id == productData._id &&
                        basket[i].colors != select.value ||
                        basket[i]._id != productData._id
                    ) {
                        return (
                            //console.log("new"),
                            button.textContent = "Produit ajouté",
                            button.style.color = "#00FF00",
                            basket.push(cart),
                            localStorage.setItem("basketClient", JSON.stringify(basket)),
                            (basket = JSON.parse(localStorage.getItem("basketClient")))
                        )
                    }
                }
            }

        } else {

            alert("Veuillez saisir une couleur et une quantité supérieure à 0 et inférieure ou égale à 100")
        }
    })
    return (basket = JSON.parse(localStorage.getItem("basketClient")))
}
// Fin de l'écoute


