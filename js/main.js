import {getAllTeddyBear} from './utilities.js';
import {createCard} from './utilities.js';
/*
import {getOneTeddyBear} from './utilities.js';
*/
getAllTeddyBear().then(function(data){createCard(data)});

