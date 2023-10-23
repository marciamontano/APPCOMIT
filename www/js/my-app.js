// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
        { path: '/index/',            url: 'index.html',    },
        { path: '/reg2/',             url: 'reg2.html',    },
        { path: '/pag3/',             url: 'pag3.html',    },
        { path: '/masInfo/',          url: 'masInfo.html',    },
        { path: '/about/',            url: 'about.html',    },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var nombre, apellido, mail, pass;


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('Cargo INDEX');
    
})
$$("#indexSeguir").on('click', fnPaso1);


$$(document).on('page:init', '.page[data-name="reg2"]', function (e) {
    console.log('Cargo REG2');

    $$("#reg2Seguir").on('click', fnPaso2)
})

$$(document).on('page:init', '.page[data-name="pag3"]', function (e) {
    console.log('Cargo PAG3');

    $$("#pag3Nombre").html(nombre);
    $$("#pag3Mail").html(mail);


})

$$(document).on('page:init', '.page[data-name="masInfo"]', function (e) {
    console.log('Cargo masInfo');
})

$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    console.log('Cargo ABOUT');
})






/* MIS FUNCIONES */
function fnPaso1() {
    mail = $$('#indexEmail').val();
    pass = $$('#indexPassword').val();

    if (mail != "" && pass != "") {
        // pasar a reg2
        mainView.router.navigate("/reg2/");
    } else {
        $$("#indexMensaje").html("Completá el <b>Email y Clave</b>");
    }
}

function fnPaso2() {
    nombre = $$('#reg2Nombre').val();
    apellido = $$('#reg2Apellido').val();

    if (nombre != "" && apellido != "") {
        // pasar a reg2
        mainView.router.navigate("/pag3/");
    } else {
        $$("#reg2Mensaje").html("Completá el <b>Nombre y Apellido</b>");
    }
}

    //CÓDIGO PARA EL REGISTRO

    // cada un@ pone su magia para recuperar el mail y la clave de un form...
    var emailDelUser = "elvalor@delmail.com";
    var passDelUser = "1234567890";

        firebase.auth().createUserWithEmailAndPassword(emailDelUser, passDelUser)
        .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Bienvenid@!!! " + emailDelUser);
        // ...
        mainView.router.navigate('/siguientePantallaDeUsuarioOK/');
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode);
        console.error(errorMessage);

        if (errorCode == "auth/email-already-in-use") {
            console.error("el mail ya esta usado");
        }

        // ..
        });

    //CODIGO DE LOGIN:
    // cada un@ pone su magia para recuperar el mail y la clave de un form...
    var emailDelUser = "elvalor@delmail.com";
    var passDelUser = "1234567890";

        firebase.auth().signInWithEmailAndPassword(emailDelUser, passDelUser)
        .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Bienvenid@!!! " + emailDelUser);
        // ...
        })

        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.error(errorCode);
                console.error(errorMessage);
        });
