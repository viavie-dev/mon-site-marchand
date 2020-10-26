import {getAllTeddyBear, createCard, loadCart} from './utilities.js';
import {quantityItemsInBasket} from './utilities.js';
const STORAGE_KEY_CART = "cart";

getAllTeddyBear().then(function(data){createCard(data)});


let cart = loadCart( STORAGE_KEY_CART);
