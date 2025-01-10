let login = document.getElementById("login");
let register = document.getElementById("register");

function cambioDeSeccion() {
    login.addEventListener('click', function() {
        login.classList.remove("text-secondary");
        login.classList.add("text-white");

        register.classList.remove("text-white");
        register.classList.add("text-secondary");
    });

    register.addEventListener('click', function() {
        register.classList.remove("text-secondary");
        register.classList.add("text-white");

        login.classList.remove("text-white");
        login.classList.add("text-secondary");
    });
}

cambioDeSeccion();