//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_PRICE = 'Asc price';
const ORDER_DESC_BY_PRICE = 'Desc price';
const ORDER_DESC_BY_REL = 'Desc rel';
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
var currentProductsArray = [];
var sentenceSearched = '';

function delateDivListContainer(){
  let $divListContainer = document.getElementById('products-list-container');
  $divListContainer.parentNode.removeChild($divListContainer);
}
function createDivListContainer(){
  div = document.createElement('div');
  div.setAttribute('id', 'products-list-container');
  let $listContainerParent = document.getElementById('list-container-parent');
  $listContainerParent.appendChild(div);
}
createDivListContainer();
function sortProducts(criteria, array){
  if (criteria === ORDER_ASC_BY_PRICE) {
      array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_PRICE){
      array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_REL) {
    array.sort(function(a, b){
      if (a.soldCount > b.soldCount) {return -1;}
      if (a.soldCount < b.soldCount) {return 1;};
      return 0;
    })
  }
}

function showProductsList(){
  let htmlContentToAppend = "";
  for(let i = 0; i < currentProductsArray.length; i++){
      let product = currentProductsArray[i];
      if (((minPrice === undefined || minPrice === '') || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
        ((maxPrice === undefined || maxPrice === '') || (maxPrice != undefined && parseInt(product.cost) <= maxPrice)) && (product.name.toLocaleLowerCase().includes(sentenceSearched))){
        htmlContentToAppend += `
        <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </a>
        `
    }
  }
  document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function (e) {
  function addUser(){
    let $nombreUs = document.getElementById('nombre-us');
    let nombre = document.createTextNode(localStorage.getItem('usuario'));
    $nombreUs.appendChild(nombre);
  }
  
  addUser();
  getJSONData(PRODUCTS_URL)
  .then((resultObj)=>{
    if (resultObj.status === "ok"){
      currentProductsArray = resultObj.data;
      showProductsList();
    }
  })

  let $labelsortDescRel = document.getElementById('sortDescRel');
  let $labelsortAscPrice = document.getElementById('sortAscPrice');
  let $labelsortDescPrice = document.getElementById('sortDescPrice');
  let $filterButton = document.getElementById('rangeFilterPrice');
  let $searchButton = document.getElementById('search-button');

  
  $labelsortAscPrice.addEventListener('click', function(){
    currentSortCriteria = ORDER_ASC_BY_PRICE;
    sortProducts(currentSortCriteria, currentProductsArray);
    delateDivListContainer();
    createDivListContainer();
    showProductsList();
  })
  $labelsortDescPrice.addEventListener('click', function(){
    currentSortCriteria = ORDER_DESC_BY_PRICE;
    sortProducts(currentSortCriteria, currentProductsArray);
    delateDivListContainer();
    createDivListContainer();
    showProductsList();
  })
  $labelsortDescRel.addEventListener('click', function(){
    currentSortCriteria = ORDER_DESC_BY_REL;
    sortProducts(currentSortCriteria, currentProductsArray);
    delateDivListContainer();
    createDivListContainer();
    showProductsList();
  })
  $filterButton.addEventListener('click', function(){
    let $inputMin = document.getElementById('rangeFilterPriceMin').value;
    let $inputMax = document.getElementById('rangeFilterPriceMax').value;
    minPrice = $inputMin;
    maxPrice = $inputMax;
    console.log(minPrice);
    delateDivListContainer();
    createDivListContainer();
    showProductsList();
  })
  $searchButton.addEventListener('click', function(){
    let $searchFieldValue = document.getElementById('search-field').value.toLocaleLowerCase();
    sentenceSearched = $searchFieldValue;
    delateDivListContainer();
    createDivListContainer();
    showProductsList();
  })

});
