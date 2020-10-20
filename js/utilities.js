const url = "http://localhost:3000/api/teddies";

function ObjectSize(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

export function getAllTeddyBear() {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json()) 
            .then(function(response){ resolve(response)})
            .catch(reject);
    })
   }

export function createCard(data){
    for (let i=0; i <ObjectSize(data); i++){   
      let price = parseInt(data[i].price);
      price = price / 100;
      price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price); 
      document.getElementById("cardContainer").insertAdjacentHTML('beforeend', '<div class="card col-6 p-1 mb-2" style="width: 18rem;"> <img src=" '+ data[i].imageUrl + '" class="card-img-top" alt="..."> <div class="card-body">  <h5 class="card-title">'+ data[i].name  + '</h5> <p class="card-text">' + price + ' euros</p> <a href="teddyBear.html?id='+data[i]._id +'" class="btn btn-primary">En savoir plus</a> </div>'
      )}
}

export function getOneTeddyBear(id){
    return new Promise((resolve, reject) => {
        fetch(url+'/'+id)
            .then(response => response.json()) 
            
            .then(function(response){ 
                console.log(response);
                resolve(response)})
            .catch(reject);
    })

}

export function displayOneTB (product){
    let price = parseInt(product.price);
    price = price / 100;
    price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price); 
    document.getElementById("teddy").insertAdjacentHTML('beforeend', '<div class="card col-6"><img src="'+ product.imageUrl + ' " alt="nounours" style="width: 100%;"></div><div class="card col-6"><h1>'+product.name+'</h1><h3>Couleurs : '+product.colors+'</h3><h2>'+price+'</h2><p>'+product.description+'</p></div>');

}
