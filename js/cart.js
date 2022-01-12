//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let products = [];

function showProductsInCart(container, products){
    let htmlContentToAppend = '';
    for (i = 0; i < products.length; i++){
        let product = products[i];
        htmlContentToAppend += `
        <tr class="product">
            <td><img src="${product.src}" width="80"></td>
            <td>${product.name}</td>
            <td>${product.currency} ${product.unitCost}</td>
            <td><input type="number" class="w-50" value="${product.count}" name="productCount"></td>
            <td id="productsSubtotal${i}"></td>
        </tr>`
    }
    container.innerHTML = htmlContentToAppend;
}

function addTotalProduct(i){
    totalProductIndex = document.getElementById(`productsSubtotal${i}`);
    products[i].totalCost = products[i].unitCost * products[i].count;
    totalProductIndex.innerHTML = `${products[i].currency} ${products[i].totalCost}`;
}
function addSubtotal(){
    let $subtotalText = document.getElementById('subtotalText');
    let subtotal = 0;
    for(i = 0; i < products.length; i++){
        if (products[i].currency == 'USD') {totalProductInPesos = products[i].totalCost * 40};
        if(products[i].currency == 'UYU') {totalProductInPesos = products[i].totalCost};
        subtotal += totalProductInPesos;
    }
    $subtotalText.innerHTML = subtotal;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json')
    .then((resultObj)=>{
        let $productsInCart = document.getElementById('productsInCart');
        products = resultObj.data.articles;
        showProductsInCart($productsInCart, products);
        
        let cantidadesProducto = document.getElementsByName('productCount');
        cantidadesProducto.forEach((cantidadProducto, i)=>{
            addTotalProduct(i);
            addSubtotal();
            cantidadProducto.addEventListener('change', ()=>{
                products[i].count = cantidadProducto.value;
                addTotalProduct(i);
                addSubtotal();
            });
        });
    });
});