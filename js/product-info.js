var product = {};
var comments = [];
var date = {};


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function firstLetterToUpper(string){
    let firstLetter = string.charAt(0).toUpperCase();
    let rest = string.slice(1);
    return firstLetter + rest;
}

function showComments(array){
        let commentsList = array;
        let $productComments = document.getElementById('productComments');
        let htmlContentToAppend = '';
        for (let i = 0; i < commentsList.length; i++){
            comment = commentsList[i];
            let dateAndTime = {};
            let arrayDateAndTime = comment.dateTime.split(' ');
            dateAndTime['date'] = arrayDateAndTime[0];
            dateAndTime['time'] = arrayDateAndTime[1];

            let arrayNameAndSurname = [];
            let nameAndSurname = {};
            if (comment.user.includes('_')){
                arrayNameAndSurname = comment.user.split('_');
            } else {
                arrayNameAndSurname = comment.user.split(' ');
            }
            nameAndSurname['name'] = firstLetterToUpper(arrayNameAndSurname[0]);
            nameAndSurname['surname'] = firstLetterToUpper(arrayNameAndSurname[1]);
            htmlContentToAppend += `
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4>`+ nameAndSurname.name + ` ` + nameAndSurname.surname + `
                                <div class="puntuacion-comentario" id="puntuationComment${i}"></div>
                            </h4>
                            <small class="text-muted">` + dateAndTime.date + ` a las ` + dateAndTime.time + `</small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                    </div>
                </div>
            </li>`
            $productComments.innerHTML = htmlContentToAppend; 
        }
        showPuntuation(comments);
}

function showPuntuation(array){
    for (let i = 0; i < array.length; i++){
        let puntuation = array[i].score;
        let htmlContentToAppend = '';
        let $puntuacionEstrellas = document.getElementById(`puntuationComment${i}`);
        for (let i = 0; i < puntuation; i++){
            htmlContentToAppend += `
            <span class="fa fa-star checked"></span>`
            $puntuacionEstrellas.innerHTML = htmlContentToAppend;
        }
        for (let i = 0; i < (5 - puntuation); i++){
            htmlContentToAppend += `
            <span class="fa fa-star"></span>`
            $puntuacionEstrellas.innerHTML = htmlContentToAppend;
        }
    }
}

function addZeroDepending(number){
    let numberwithzero = `0${number}`;
    if (number >= 10) {
        return number;
    } else {
        return numberwithzero;
    }
}

function addMethodtoDate(date, method){
    date[method.name] = method;
}

function getDateInFormat(){
    let anio = date.getFullYear();
    let mes = addZeroDepending(date.getMonth() + 1);
    let dia = addZeroDepending(date.getDate());
    let hora = addZeroDepending(date.getHours());
    let minuto = addZeroDepending(date.getMinutes());
    let segundo = addZeroDepending(date.getSeconds());
    return `${anio}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
    
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL)
    .then((resultObj)=>{
        if (resultObj.status === "ok"){
            console.log(resultObj.data);
            product = resultObj.data;

            let $productName  = document.getElementById("productName");
            let $strongProductName = document.getElementById("strongProductName");
            let $productDescription = document.getElementById("productDescription");
            let $soldCount = document.getElementById("soldCount");
            let $estrellas = document.getElementsByName('estrellas');
            let score = null;
            let $commentSubmit = document.getElementById('commentSubmit');

            $productName.innerHTML = product.name;
            $strongProductName.innerHTML = product.name;
            $productDescription.innerHTML = product.description;
            $soldCount.innerHTML = product.soldCount;
            showImagesGallery(product.images);
            
            getJSONData(PRODUCT_INFO_COMMENTS_URL)
            .then((resultObj)=>{
            if (resultObj.status === "ok"){
                comments = resultObj.data
                console.log(comments);
                showComments(comments);
            }
            
            for (let estrella of $estrellas){
                estrella.onclick = function(){
                    score = estrella.value;  
                }
            }
            
        })
            
            $commentSubmit.addEventListener('click', function(e){
                e.preventDefault();
                let newComment = {};
                let userName = localStorage.getItem('usuario');
                date = new Date;
                addMethodtoDate(date, getDateInFormat);
                let commentTextArea = document.getElementById('commentText').value;
                
                newComment['user'] = userName;
                newComment['score'] = score;
                newComment['dateTime'] = date.getDateInFormat();
                newComment['description'] = commentTextArea;

                score === null
                ? alert('Debes puntuar el producto')
                : comments.push(newComment);
                showComments(comments);
            })
            return resultObj;
        }
    })
    .then((resultObj)=>{
        if (resultObj.status === 'ok'){
            getJSONData(PRODUCTS_URL)
            .then((resultObj)=>{
                let $relatedProducts = document.getElementById('related-procucts');
                let products = resultObj.data
                let htmlContentToAppend = "";
                for (i = 0; i < product.relatedProducts.length; i++){
                    htmlContentToAppend += `
                    <li>${products[product.relatedProducts[i]].name}</li>
                    <img src="${products[product.relatedProducts[i]].imgSrc}"></img>`
                    $relatedProducts.innerHTML = htmlContentToAppend;
                }
            })
        }
    })
});