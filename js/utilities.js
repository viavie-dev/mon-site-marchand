//La constante qui permet l'accés au fichier Json de l'API
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

// Affichage de l'ensemble des nounours
export function getAllTeddyBear() {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(function (response) { resolve(response) })
            .catch(reject);
    })
}

// Affichage des cartes représentant tous les produits   
export function createCard(data) {
    for (let i = 0; i < ObjectSize(data); i++) {
        let price = parseInt(data[i].price);
        price = displayPriceEuros(price);
        document.getElementById("cardContainer").insertAdjacentHTML('beforeend', `
      <div class="card col-6 p-1 mb-2" style="width: 18rem;"> <img src="${data[i].imageUrl}" class="card-img-top" style="height: 400px"alt="nounours">
      <div class="card-body"><h5 class="card-title">${data[i].name}</h5>
      <p class="card-text">${price} euros</p>
      <a href="teddyBear.html?id=${data[i]._id}" class="btn btn-primary mr-2">En savoir plus</a>
      `
        )
    }
}

export function getOneTeddyBear(id) {
    return new Promise((resolve, reject) => {

        //Création d'une chaine de requete : url + / + id
        fetch(url + '/' + id)
            .then(response => response.json())

            .then(function (response) {
                //console.log(response);
                resolve(response)
            })
            .catch(reject);
    })

}

// Affichage d'un produit
export function displayOneTB(product) {
    let price = parseInt(product.price);
    price = displayPriceEuros(price);

    let colors = [];
    colors = product.colors;
    let color = colors.join(', ');


    for (let i = 0; i < colors.length; i++) {
        document.getElementById("colors").insertAdjacentHTML('beforeend', `<option value="${colors[i]}">${colors[i]}</option>`);
    }

    document.getElementById("teddy").insertAdjacentHTML('beforebegin', `<div class="card col-6"><img src="${product.imageUrl}" alt="nounours" style="width: 100%;"></div>
    <div class="card col-6"><h1>${product.name}</h1><h3>Couleurs : ${color}</h3>
    <h2>${price}</h2><p>${product.description}</p></div>`);

    document.getElementById('price').value = product.price;
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

//une fonction qui si le panier est vide, initialise le panier, et sinon le récupère dans le local storage.
export function loadCart(key) {
    let cart = STORAGE.load(key)
    if (cart !== null) {
        return cart;
    } else {
        //On initialise un tableau vide qui sera le panier.
        cart = [];
        return cart;
    }
}

//Fonction qui permet de supprimer un objet du tableau et du local storage lorsqu'on clique sur le bouton supprimer
export function onDeleteButton(e) {

    let cart = loadCart(STORAGE_KEY_CART);
    let data = e.target.dataset.id;
    let dataTab = data.split('+');
    let totalQ = 0;
    let cartQuantity = 0;

    for (let i = 0; i < cart.length; i++) {

        if (dataTab[0] == cart[i].id && dataTab[1] == cart[i].colors) {
            document.getElementById(`${cart[i].id}+${cart[i].colors}`).remove();
            let outOfCart = cart.splice(i, 1);
            saveCart(cart);
            let quantities =quantitiesItemsInBasket(cart);

            document.getElementById('items').innerHTML = `(${quantities})`;

        }

        // récupération de la propriété quantity de l'objet 
        cartQuantity = cart[i].quantity;
        totalQ += Number(cartQuantity);
        document.getElementById('allQuantity').innerHTML = `${totalQ}`;

        let total = totalCommande(cart);
        total = displayPriceEuros(total);

        document.getElementById('totalCommande').innerHTML = `${total}`;

    }

   
}

export function adjustQuantity(adjustement, cartQuantity, price, e) {

    //On récupère en local storage le tableau contenant notre panier.
    let cart = loadCart(STORAGE_KEY_CART);

    //On cible les data-id de l'élément ciblé.
    let data = e.currentTarget.dataset.id;

    //On récupère une chaîne de caractère qu'on va séparer et ranger dans un tableau ou le premier élément (l'id) sera a l'index 0 et le deuxième (les couleurs) a l'indice 1.
    let dataTab = data.split('+');

    let totalQ = 0;

    //On va parcourir le tableau correspondant au tableau pour trouver l'entrée sélectionnée par l'utilisateur.
    for (let index = 0; index < cart.length; index++) {

        if (dataTab[0] == cart[index].id && dataTab[1] == cart[index].colors) {

            cartQuantity = cart[index].quantity;
            //on transforme la variable en un chiffre manipulable.
            cartQuantity = parseInt(cartQuantity);

            // Si la quantité est supérieure ou égale a 0 et qu'on veux augmenter.
            if (cartQuantity >= 0 && adjustement > 0) {
                //On incrèmente la valeur de la variable de quantité
                cartQuantity = cartQuantity + 1;

                //Dans le cas ou la quantité est supérieure a 1 et qu'on veux la réduire 
            }
            if (cartQuantity >= 2 && adjustement < 0) {
                //On réduit la valeur de 1.
                cartQuantity = cartQuantity - 1;
            }
            cart[index].quantity = cartQuantity;


            let prices = price * parseInt(cartQuantity);

            //Le prix étant exprimé en centimes on va le mettre en un format plus lisible avec la function displayPriceEuros()
            prices = displayPriceEuros(prices);

            document.querySelector(`.quantity[data-id="${cart[index].id}+${cart[index].colors}"]`).innerHTML = cartQuantity;

            document.querySelector(`.price[data-id="${cart[index].id}+${cart[index].colors}"]`).innerHTML = prices;

            let total = totalCommande(cart);
            total = displayPriceEuros(total);

            document.getElementById('totalCommande').innerHTML = `${total}`;

            saveCart(cart);
        }
        totalQ += cart[index].quantity;
        console.log(totalQ);
        document.getElementById('allQuantity').innerHTML = `${totalQ}`;
    }

}

function totalCommande(cart) {
    let total = 0;

    for (let index = 0; index < cart.length; index++) {
        total += cart[index].price * cart[index].quantity;
    }
    return total;
}

function totalQuantity(cart) {
    let allQuantity = 0;

    for (let index = 0; index < cart.length; index++) {
        allQuantity += Number(cart[index].quantity);
    }
    return allQuantity;

}

export function displayPriceEuros(price) {

    price = price / 100;

    price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
    return price;
}

export function quantitiesItemsInBasket(cart) {
 let quantities = cart.length;
return quantities

}
/*
// key du local storage key = cart ici
export function quantityItemsInBasket(key, selector) {

    if (localStorage.getItem(key)) {

        let listProducts = JSON.parse(localStorage.getItem(key));
        if (listProducts.length > 0) {
            let compteur = 0;

            // listProducts.length c'est le nombre d'objet
            for (let i = 0; i < listProducts.length; i++) {
                compteur += Number(listProducts[i].quantity);
            }
            selector.innerHTML = `${compteur}`;
        }
    }

}
*/