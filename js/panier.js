import { loadCart } from './utilities.js';
import { getOneTeddyBear } from './utilities.js';
import { onDeleteButton } from './utilities.js';
import { adjustQuantity } from './utilities.js';
const STORAGE_KEY_CART = "cart";
let cart = loadCart(STORAGE_KEY_CART);

// couleur de l'ours dans le panier

let sum = 0;
let allPrice = [];
let total = 0.00;
let subtotal = 0.00;

for (let i = 0; i < cart.length; i++) {

        let id = cart[i].id;
        let cartQuantity = cart[i].quantity;
        let cartColors = cart[i].colors;
        let priceTab = [];
        getOneTeddyBear(id).then(function (product) {

                //On convertit le prix en une valeur numérique
                let onePrice = parseInt(product.price);
                //Le prix étant exprimé en centimes on va le mettre en un format plus lisible.
                let price = onePrice / 100;
                price = price * parseInt(cartQuantity);

                sum = parseInt(price) + parseInt(sum);
                price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

                //On va générer le code html pour chaque objet parcouru dans la boucle.
                document.getElementById("cart").insertAdjacentHTML('beforeend', `
                <tr id="${product._id}+${cartColors}">
                <td><img src="${product.imageUrl}" alt="nounours" style="width: 150px;"></td>
                <td>${product.name}</td>
                <td>${cartColors}</td>
                <td ><button data-id="${product._id}+${cartColors}" class="decrease"><i class="fas fa-minus"></i></button><div data-id="${product._id}+${cartColors}" class="quantity" >${cartQuantity}</div><button data-id="${product._id}+${cartColors}" class ="increase"><i  class="fas fa-plus"></i></button></td>
                <td class="priceUnitaire">${product.price}</td>
                <td data-id="${product._id}+${cartColors}" class="price">${price}</td>

                <td><button class="delete" type="button" data-id="${product._id}+${cartColors}">Supprimer</button></td>
                </tr>
                `);


                document.querySelector(`.delete[data-id="${product._id}+${cartColors}"]`).addEventListener('click', onDeleteButton);

                document.querySelector(`.decrease[data-id="${product._id}+${cartColors}"]`).addEventListener('click', function (e) { adjustQuantity(-1, cartQuantity, onePrice, sum, e) });
                document.querySelector(`.increase[data-id="${product._id}+${cartColors}"]`).addEventListener('click', function (e) { adjustQuantity(1, cartQuantity, onePrice, sum, e) });

                sum = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(sum);

           
                priceTab[0] = cart[i].id;
                priceTab[1] = product.price;

                allPrice.push(priceTab);

                subtotal = parseFloat(priceTab[1]) * parseFloat(cartQuantity);
               // console.log(subtotal);
                total += subtotal;
               // console.log(typeof total);
                let totalCommande= total/100;
                document.getElementById('totalCommande').innerHTML = `total de la commande : ${totalCommande} euros`;
              //  console.log(totalCommande);
        });


}

