// Url SearchParams

let pageProducts = "http://127.0.0.1:5500/front/html/product.html?id=";
let url = new URL(pageProducts);
let id = url.searchParams.get("id");
console.log(id)

let productData = [];

// fetch product 

const loadingPageProduct = async () => {
    await fetch("http://localhost:3000/api/products/" + id)
        .then((res) => res.json())
        .then((data) => {
            productData = data
            console.log(productData)
        })
}


// page product containing details of product

const productDisplay = async () => {
    await loadingPageProduct();
  
        document
            .querySelector(".item__img")
            .innerHTML += `<img src="${productData.imageUrl}" alt="${productData.altTxt}"></img>`
    

}

productDisplay();


