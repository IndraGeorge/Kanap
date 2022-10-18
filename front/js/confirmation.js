// Récupération de l'id de commande dans l'URL de la page 
const url = new URLSearchParams(window.location.search).get("orderId")
console.log(url);

// Si l'id de commande n'est pas présente dans l'url on affiche une erreur
// Sinon on insère le numéro de commande

if(url === null || url === 0){

    alert("Une erreur est survenue,veuillez nous excuser du désagrément")
    document.location = "index.html"

} else{

    const orderId = document.getElementById("orderId")
    orderId.textContent = url
    console.log(orderId);
}
