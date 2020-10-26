import { loadCart } from './utilities.js';
import { getOneTeddyBear } from './utilities.js';
import { onDeleteButton } from './utilities.js';
import { adjustQuantity } from './utilities.js';
import { displayPriceEuros } from './utilities.js';

const STORAGE_KEY_CART = "cart";
let cart = loadCart(STORAGE_KEY_CART);

// couleur de l'ours dans le panier

let sum = 0;
let allPrice = [];
let total = 0.00;
let subtotal = 0.00;
let onePriceTB =0;
let totalQ=0; 

for (let i = 0; i < cart.length; i++) {

        let id = cart[i].id;
        let cartQuantity = Number(cart[i].quantity);
        let cartColors = cart[i].colors;
        let priceTab = [];
       
        let quantityArray= [];
        getOneTeddyBear(id).then(function (product) {

                // affichage prix unitaire
                onePriceTB = parseInt(product.price);
                onePriceTB  = displayPriceEuros(onePriceTB);

                //On convertit le prix en une valeur numérique
                let onePrice = parseInt(product.price);
                
                let price = onePrice/100;

                price = price * parseInt(cartQuantity);

                price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
                    
               let quantityCurrent ;
                quantityCurrent = cartQuantity;

            
               totalQ+= cartQuantity;
               //console.log(totalQ);
          

                //On va générer le code html pour chaque objet parcouru dans la boucle.
                document.getElementById("cart").insertAdjacentHTML('beforeend', `
                <tr id="${product._id}+${cartColors}">
                <td><img src="${product.imageUrl}" alt="nounours" style="width: 150px;"></td>
                <td>${product.name}</td>
                <td>${cartColors}</td>
                <td ><button data-id="${product._id}+${cartColors}" class="decrease"><i class="fas fa-minus"></i></button><div data-id="${product._id}+${cartColors}" class="quantity" >${cartQuantity}</div><button data-id="${product._id}+${cartColors}" class ="increase"><i  class="fas fa-plus"></i></button></td>
                <td class="priceUnitaire">${onePriceTB}</td>
                <td data-id="${product._id}+${cartColors}" class="price">${price}</td>

                <td><button class="delete" type="button" data-id="${product._id}+${cartColors}">Supprimer</button></td>
                </tr>
                `);


                document.querySelector(`.delete[data-id="${product._id}+${cartColors}"]`).addEventListener('click', onDeleteButton);

                document.querySelector(`.decrease[data-id="${product._id}+${cartColors}"]`).addEventListener('click', function (e) { adjustQuantity(-1, cartQuantity, onePrice, e, allPrice) });
                document.querySelector(`.increase[data-id="${product._id}+${cartColors}"]`).addEventListener('click', function (e) { adjustQuantity(1, cartQuantity, onePrice, e, allPrice) });
                   
                //console.log(cartQuantity); 

                
                           
                priceTab[0] = cart[i].id;
                priceTab[1] = product.price;

                allPrice.push(priceTab);


                document.getElementById('allQuantity').innerHTML = `${totalQ}`;    

                subtotal = parseFloat(priceTab[1]) * parseFloat(cartQuantity);
             
                total += subtotal;
              
                let totalCommande= displayPriceEuros(total);
                document.getElementById('totalCommande').innerHTML = `${totalCommande}`;                          
             
        });   
       
        console.log(quantityArray);
}

