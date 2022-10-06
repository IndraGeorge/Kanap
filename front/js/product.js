
// Url SearchParams
const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

// array product
let productData = [];

// button add to cart
let button = document.getElementById("addToCart");


// fetch product 
const loadingPageProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            productData = data
            return productData
        })
}


// page product containing details of product
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

    // boucle colors
    for (let productColors of productData.colors) {
        document
            .getElementById("colors")
            .innerHTML += `<option value="${productColors}">${productColors}</option>`


    }

    addBasket(productData);

};


productDisplay();

// add to cart 

const addBasket = () => {

    button.addEventListener('click', () => {

        // variable colors and quantity
        let select = document.getElementById("colors");
        let choiceQuantity = document.getElementById("quantity");

        // condition if color and quantity  selected
        if (select.value != "" &&
            choiceQuantity != 0  &&
            choiceQuantity.value > 0 &&
            choiceQuantity.value < 100
        ) {

            //new array of productData
            const cart = Object.assign({}, productData, {
                colors: `${select.value}`,
                quantity: 1,
            })

            // variable local storage
            let basket = JSON.parse(localStorage.getItem("basketClient"))

            // condition if basket contains nothing
            if (basket == null) {
                basket = [];
                basket.push(cart)
                console.table(basket)
                localStorage.setItem("basketClient", JSON.stringify(basket));

                // condition if basket contains items
            } else if (basket != null) {
                for (i = 0; i < basket.length; i++) {
                    if (basket[i]._id == productData._id &&
                        basket[i].colors == select.value
                    ) {
                        return (
                            basket[i].quantity++,
                            console.log("quantity++"),
                            localStorage.setItem("basketClient", JSON.stringify(basket)),
                            (basket = JSON.parse(localStorage.getItem("basketClient")))
                        )
                    }
                }
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
        }

    })

    return (basket = JSON.parse(localStorage.getItem("basketClient")))

}



