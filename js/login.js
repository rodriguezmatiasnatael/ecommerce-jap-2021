//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    localStorage.setItem('logueado', 'false');
    
    function login(){
        let loginButton = document.getElementById('loginButton');
        loginButton.addEventListener('click', function(e){
            e.preventDefault();
            var $userName = document.getElementById('userName').value;
            var $password = document.getElementById('password').value;
            if($userName ==='' || $password ==='') {
                alert('Ingrese usuario y contraseña');
            } else if ($password.length < 9 && $userName.length < 6) {
                alert('La contraseña debe contener por lo menos 9 caracteres y el usuario por lo menos 6');
            } else if ($password.length >= 9 && $userName.length < 6){
                alert('El nombre de usuario debe contener por lo menos 6 caracteres');
            } else if ($password.length < 9 && $userName.length >= 6) {
                alert('La contraseña debe contener por lo menos 9 caracteres');
            } else {
                localStorage.setItem('logueado', 'true');
                localStorage.setItem('usuario', $userName);
                let infousuario = {
                    usuario: $userName,
                    nombre: null,
                    apellido: null,
                    edad: null,
                    email: null,
                    telefono: null
                }
                localStorage.setItem('infousuario', JSON.stringify(infousuario));
            }
            if (localStorage.getItem('logueado') == 'true') {location.replace('index.html');}
        });
    }
    
    login();

});


