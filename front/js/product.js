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
        console.log(productColors)

    }

    addBasket(productData);
};


productDisplay();

// add to cart 

const addBasket = () => {

    button.addEventListener('click', function () {

        let basket = JSON.parse(localStorage.getItem("kanap")); 
        localStorage.setItem("kanap", JSON.stringify(basket)); 
        console.log(basket);
        basket.push(productData)

       

    })

} 
