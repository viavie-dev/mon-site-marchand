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

// création d'un objet / Panier
let object= {};

let quantity= document.getElementById('quantity');
let colors = document.getElementById('colors');
let form=  document.getElementById('form');

function onClickSubmitButton (e){
    // Annulation de la soumission du form
    e.preventDefault(); 
    // création de l'objet du produit de la page que l'on stocke dans le tableau d'objet que l'on stockera dans le localStorage
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