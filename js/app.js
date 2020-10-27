import { loadCart } from './utilities.js';
import { quantitiesItemsInBasket } from './utilities.js';


const STORAGE_KEY_CART = "cart";

let cart =loadCart(STORAGE_KEY_CART);

let quantities =quantitiesItemsInBasket(cart);

document.getElementById('items').innerHTML = `(${quantities})`;