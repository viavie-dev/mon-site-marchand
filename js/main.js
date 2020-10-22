import {getAllTeddyBear, createCard} from './utilities.js';

const STORAGE_KEY_CART = "cart";

getAllTeddyBear().then(function(data){createCard(data)});


