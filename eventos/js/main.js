let login = document.getElementById("login");
let register = document.getElementById("register");



function cambioDeSeccion(){
    login.addEventListener('click', function(){
        h5.classList.remove("text-secondary");
        h5.classList.add("text-white");
    });

}

cambioDeSeccion();