const url = "http://localhost:3000/api/teddies";
let cart;
const STORAGE_KEY_CART = "cart";
// function pour connaitre la taille d'un objet
function ObjectSize(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

export function getAllTeddyBear() {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json()) 
            .then(function(response){ resolve(response)})
            .catch(reject);
    })
   }

// Affichage des cartes représentant tous les produits   
export function createCard(data){
    for (let i=0; i <ObjectSize(data); i++){   
      let price = parseInt(data[i].price);
      price = price / 100;
      price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price); 
      document.getElementById("cardContainer").insertAdjacentHTML('beforeend', '<div class="card col-6 p-1 mb-2" style="width: 18rem;"> <img src=" '+ data[i].imageUrl + '" class="card-img-top" style="height: 400px"alt="..."> <div class="card-body">  <h5 class="card-title">'+ data[i].name  + '</h5> <p class="card-text">' + price + ' euros</p><a href="teddyBear.html?id='+data[i]._id +'" class="btn btn-primary mr-2">En savoir plus</a><a href="#" class="btn btn-primary">Panier</a></div>'
      )}
}

export function getOneTeddyBear(id){
    return new Promise((resolve, reject) => {

        //Création d'une chaine de requete : url + / + id
        fetch(url+'/'+id)
            .then(response => response.json()) 
            
            .then(function(response){ 
                //console.log(response);
                resolve(response)})
            .catch(reject);
    })

}

// Affichage d'un produit
export function displayOneTB (product){
    let price = parseInt(product.price);
    price = price / 100;
    price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price); 

    let colors =[];
    colors = product.colors;
    let color= colors.join(', '); 

   
    for(let i=0; i<colors.length; i++){
        document.getElementById("colors").insertAdjacentHTML('beforeend', ` <option value="${colors[i]}">${colors[i]}</option>` );
    }  
       
    //let matchesColors= [{'rgb(152,118,84)': "Pale brown", '':"white"}];

    document.getElementById("teddy").insertAdjacentHTML('beforebegin', '<div class="card col-6"><img src="'+ product.imageUrl + ' " alt="nounours" style="width: 100%;"></div><div class="card col-6"><h1>'+product.name+'</h1><h3>Couleurs : ' + color + '</h3><h2>'+price+'</h2><p>'+product.description+'</p></div>');

}

export const STORAGE = {

    save: (key, value) => {
        const jsonData = JSON.stringify(value);
        window.localStorage.setItem(key, jsonData);
    },

    load: key => {
        const jsonData = localStorage.getItem(key);
        return JSON.parse(jsonData);
    }

};

// persister le panier ; fonction qui stocke les données du panier et sera récupéré sur la page panier
export function saveCart(cart) {
    STORAGE.save(STORAGE_KEY_CART, cart);

}

export function loadCart(key){
   let cart = STORAGE.load(key)
   if ( cart !== null){
       return cart;
   }else {
       //On initialise un tableau vide qui sera le panier.
        cart = [];   
        return cart;   
   }
}