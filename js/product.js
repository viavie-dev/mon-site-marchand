import { getOneTeddyBear } from './utilities.js';
import { displayOneTB } from './utilities.js';
import { STORAGE } from './utilities.js';

/*   AFFICHAGE */

// récupération de la page courante
let urlJson = new URL(window.location);
// Récupération de l'id qui est dans la chaine de requête de l'url
let id = urlJson.searchParams.get("id");
//console.log(id);

let cart = [];

// récupération des datas  lié à l'id de l'objet
getOneTeddyBear(id).then(function (product) { displayOneTB(product) });

/*   REALISATION DU PANIER DE PRODUIT : stockage des datas*/

const STORAGE_KEY_KART = "cart";

let form = document.getElementById('form');

function onClickSubmitButton(e) {

    // Annulation de la soumission du form
    e.preventDefault();


    // création de l'objet du produit de la page que l'on stocke dans le tableau d'objet que l'on stockera dans le localStorage
    let object = {
        id: id,
        colors: document.getElementById('colors').value,
        quantity: document.getElementById('quantity').value
    };
    let control = true;
    //  on partcourt notre tableau d'objet
    for (let j = 0; j < cart.length; j++) {

        // on compare l'id de l'objet en cours avec l'id de l'objet du tableau 
        //Pour chaque objet, si l'id et la couleur de l'objet créé par la soumission sont = à l'id et la couleur d'un objet du tableau on incrémente juste la quantité.

        if (object.id == cart[j].id && object.colors == cart[j].colors) {
            cart[j].quantity = parseInt(cart[j].quantity) + parseInt(object.quantity);
            control = false;
        }
    }

    if (control != false) {
        cart.push(object);
    }

    console.log(cart);

}
form.addEventListener('submit', onClickSubmitButton);


// persister le panier
export function dataStorage() {


}