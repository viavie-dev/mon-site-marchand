const url = "http://localhost:3000/api/teddies";

let urlJson= new URL(window.location);
let id= urlJson.searchParams.get("id");

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
      document.getElementById("cardContainer").insertAdjacentHTML('beforeend', '<div class="card col-6 p-1 mb-2" style="width: 18rem;"> <img src=" '+ data[i].imageUrl + '" class="card-img-top" alt="..."> <div class="card-body">  <h5 class="card-title">'+ data[i].name  + '</h5> <p class="card-text">' + price + ' euros</p> <a href="#" class="btn btn-primary">Go somewhere</a> </div>'
      )}
}


export function getOneTeddyBear(url,id){
    return new Promise((resolve, reject) => {
        fetch(url+id)
            .then(response => response.json()) 
            .then(function(response){ resolve(response)})
            .catch(reject);
    })

}

export function displayOneTB (data, id){
    document.getElementById("teddy").insertAdjacentHTML('beforeend', '<div class="col-2"><img src="" alt=""></div>');

}
