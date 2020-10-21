import {getOneTeddyBear} from './utilities.js';
import {displayOneTB} from './utilities.js';
import {STORAGE} from './utilities.js';

/*   AFFICHAGE */

// récupération de la page courante
let urlJson= new URL(window.location);
let id= urlJson.searchParams.get("id");
console.log(id);

// récupération des datas  lié à l'id de l'objet
getOneTeddyBear(id).then(function(product){displayOneTB(product)});

/*   REALISATION DU PANIER DE PRODUIT : stockage des datas*/

const STORAGE_KEY_KART = "kart";

// tableau d'objets ; 
let cart = [];
let object= {};

let quantity= document.getElementById('quantity');
let colors = document.getElementById('colors');
let form=  document.getElementById('form');

function onClickSubmitButton (e){
    e.preventDefault(); 
    object = {id : id ,
        colors : colors.value,
      quantity : quantity.value};
}
cart= cart.push(object);
console.log(cart);
form.addEventListener('submit', onClickSubmitButton);


// persister le panier
export function dataStorage() {

    
}