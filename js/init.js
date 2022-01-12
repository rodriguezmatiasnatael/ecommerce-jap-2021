const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// function addUser(){
//   let $menuContainer = document.getElementById('menuContainer');
//   let $a = document.createElement('a');
//   $a.setAttribute('class', 'py-2 d-none d-md-inline-block');
//   $a.setAttribute('href','#');
//   let nombre = document.createTextNode(localStorage.getItem('usuario'));
//   $a.appendChild(nombre);
//   $menuContainer.appendChild($a);
// }
function addUser(){
  let $menuContainer = document.getElementById('menuContainer');
  let $a = document.createElement('a');
  $a.setAttribute('id', 'userName');
  $a.setAttribute('class', 'py-2 d-none d-md-inline-block');
  $a.setAttribute('href','#');
  $a.innerHTML = `
  ${localStorage.getItem('usuario')}
  <ul class="ul-list">
    <li><a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a></li>
    <li><a class="py-2 d-none d-md-inline-block" href="my-profile.html">Mi perfil</a></li>
    <li><a class="py-2 d-none d-md-inline-block" href="" id="signOut">Cerrar sesión</a></li>
  </ul>`
  $menuContainer.appendChild($a);
}
function signOut(){
  localStorage.setItem('logueado', false);
  localStorage.clear('usuario');
  window.location = 'login.html';
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    if (!window.location.href.endsWith('login.html')) {
      addUser();
      if (localStorage.getItem('logueado') === 'false' || localStorage.getItem('logueado') === null) {location.replace('login.html');}
    }
    let $signOut = document.getElementById('signOut');
    $signOut.addEventListener('click', function(e){
      e.preventDefault();
      signOut();
    });
});