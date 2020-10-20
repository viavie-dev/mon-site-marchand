const url = "http://localhost:3000/api/teddies";


let urlJson= new URL(window.location);
let id= urlJson.searchParams.get("id");


export function getAllTeddyBear() {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json()) 
            .then(function(response){ resolve(response)})
            .catch(reject);
    })
   
}

export function createCard(data){
    for (let i=0; i < 4 ;i++){
      document.getElementById("cardContainer").insertAdjacentHTML('beforeend', '<div class="card col-6 p-1 mb-2" style="width: 18rem;"> <img src=" '+ data[i].imageUrl + '" class="card-img-top" alt="..."> <div class="card-body">  <h5 class="card-title">'+ data[i].name  + '</h5> <p class="card-text">' + data[i].price + ' euros</p> <a href="#" class="btn btn-primary">Go somewhere</a> </div>'
      )}
}


function getOneTeddyBear(url,id){
    return new Promise((resolve, reject) => {
        fetch(url+id)
            .then(response => response.json()) 
            .then(function(response){ resolve(response)})
            .catch(reject);
    })

}

function displayOneTB (){

    
}
