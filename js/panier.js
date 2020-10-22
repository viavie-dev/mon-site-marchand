import { loadCart } from './utilities.js';
import { getOneTeddyBear } from './utilities.js';

const STORAGE_KEY_CART = "cart";
let cart = loadCart(STORAGE_KEY_CART);

// couleur de l'ours dans le panier
let colorCart;
let cartQuantity;
// correspondance prix id
//if(){
//   let price;
//}


for (let i = 0 ; i< cart.length ; i++){ 
    
    let id = cart[i].id;
    let cartQuantity = cart[i].quantity;
    let cartColors = cart[i].colors;
    
    getOneTeddyBear(id).then(function(product){   
            //On convertit le prix en une valeur numérique
             let price = parseInt(product.price);
             //Le prix étant exprimé en centimes on va le mettre en un format plus lisible.
             price = price / 100;
             price = price * parseInt(cartQuantity);
             price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price); 
        
             //On va générer le code html pour chaque objet parcouru dans la boucle.
        document.getElementById("cart").insertAdjacentHTML('beforeend',`
        <tr>
        <td><img src="${product.imageUrl}" alt="nounours" style="width: 150px;"></td>
        <td>${product.name}</td>
        <td>${cartColors}</td>
        <td>${cartQuantity}</td>
        <td>${price}</td>
        </tr>
        `);

})
}