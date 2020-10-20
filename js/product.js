import {getOneTeddyBear} from './utilities.js';
import {displayOneTB} from './utilities.js';

let urlJson= new URL(window.location);
let id= urlJson.searchParams.get("id");
console.log(id);
getOneTeddyBear(id).then(function(product){displayOneTB(product)});
