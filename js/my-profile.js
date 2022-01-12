//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let user = JSON.parse(localStorage.getItem('infousuario'));

function firstLetterToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showUserInfo() {
    let $userTable = document.getElementById('userTable');
    let htmlContentToApped = '';
    for (let propiedad in user){
        let propiedadToUpper = firstLetterToUpper(propiedad);
        console.log(propiedadToUpper);
        if (user[propiedad] === null || user[propiedad] === undefined){
            htmlContentToApped += `
            <tr>
                <th>${propiedadToUpper}</th>
                <td id="value${propiedad}">---</td>
                <td><form><button class="btn btn-light" type="submit" id="button${propiedad}">Agregar</button></form></td>
            </tr>`
        } else {
            htmlContentToApped += `
            <tr>
                <th>${propiedadToUpper}</th>
                <td id="value${propiedad}">${user[propiedad]}</td>
                <td><form><button class="btn btn-light" type="submit"id="button${propiedad}">Editar</button></form></td>
            </tr>`
        }
    }
    $userTable.innerHTML = htmlContentToApped;
}

function createFormsEditProperty(){
    for (let propiedad in user){
        let $butonPropiedad = document.getElementById(`button${propiedad}`);
        $butonPropiedad.addEventListener('click', function(e){
            e.preventDefault();
            $changeContainer = document.getElementById('changeContainer');
            $valueProperty = document.getElementById(`value${propiedad}`).innerHTML;
            $changeContainer.innerHTML = `
            <form>
                <label for="input${propiedad}"></label><b>Escribe tu ${propiedad}</b>
                <input type="text" id="input${propiedad}" value="${$valueProperty}">
                <button type="submit" id="confirmChange${propiedad}">Aceptar</button>
            </form>`
            console.log(document.getElementById(`confirmChange${propiedad}`))
            changeProperty(propiedad);
        })
    }
}

function changeProperty(propiedad){
    $inputProperty = document.getElementById(`input${propiedad}`);
    $confirmChangeProperty = document.getElementById(`confirmChange${propiedad}`);
    $confirmChangeProperty.addEventListener('click', function(e){
        e.preventDefault();
        user[propiedad] = $inputProperty.value;
        showUserInfo();
        createFormsEditProperty();
        deleteFormEditProperty();
        localStorage.setItem('infousuario', JSON.stringify(user));
    });

}

function deleteFormEditProperty(){
    $changeContainer = document.getElementById('changeContainer');
    $changeContainer.innerHTML = '';
}

document.addEventListener("DOMContentLoaded", function (e) {
    showUserInfo();
    createFormsEditProperty();
});