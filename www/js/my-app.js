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
        { path: '/registro/',             url: 'registro.html',    },
        { path: '/confirmacion/',             url: 'confirmacion.html',    },
        { path: '/info/',          url: 'info.html',    },
        { path: '/login/',            url: 'login.html',    },
        { path: '/home/',            url: 'home.html',    },
        { path: '/configuracion/',            url: 'configuracion.html',    },
        { path: '/categorias/',            url: 'categorias.html',    },
        { path: '/fondos/',            url: 'fondos.html',    },
        { path: '/perfil/',            url: 'perfil.html',    },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var db = firebase.firestore();
var colRoles = db.collection("ROLES");
var colPersonas = db.collection("PERSONAS");
var colMensaje = db.collection("MENSAJES");




import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
// Add the public key generated from the console here.
getToken(messaging, {vapidKey: "BIXe3x_rV6o-XD-ZGuvJkAPSGG04hlLaD2FKxvpq2J22qp7JgoY8CX6_Bb3S4Onkt7FES6Socok983rMIEELiXU"});

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
}

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken({ vapidKey: '<BIXe3x_rV6o-XD-ZGuvJkAPSGG04hlLaD2FKxvpq2J22qp7JgoY8CX6_Bb3S4Onkt7FES6Socok983rMIEELiXU>' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });


  FirebaseMessaging.getInstance().getToken()
  .addOnCompleteListener(new OnCompleteListener<String>() {
      @Override
      public void onComplete(@NonNull Task<String> task) {
        if (!task.isSuccessful()) {
          Log.w(TAG, "Fetching FCM registration token failed", task.getException());
          return;
        }

        // Get new FCM registration token
        String token = task.getResult();

        // Log and toast
        String msg = getString(R.string.msg_token_fmt, token);
        Log.d(TAG, msg);
        Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
      }
  });


  
  



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('Cargo index');
})

    $$("#btnRegistro").on('click', fnRegistro);
    //sembrarDatos();
    cargarUsuariosEjemplo();
    

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
    console.log('Cargo Registro');

    $$("#btnFinReg").on('click', fnFinRegistro)
    
})

$$(document).on('page:init', '.page[data-name="login"]', function (e) {
    console.log('Cargo Login');

    $$("#btnInicioSesion").on('click', fnIniciarSesion)
    
})
    
$$(document).on('page:init', '.page[data-name="confirmacion"]', function (e) {
    console.log('Cargo Confirmacion');

    $$("#pagConfirmacionNombre").html(nombre);
    $$("#pagConfirmacionEmail").html(email);
    

})

$$(document).on('page:init', '.page[data-name="info"]', function (e) {
   
    cargarDatosUsuarioLogueado();
    console.log('Cargo Info');
})

$$(document).on('page:init', '.page[data-name="home"]', function (e) {
    console.log('Cargo HOME');

})

$$(document).on('page:init', '.page[data-name="configuracion"]', function (e) {
    console.log('Cargo CONFIGURACION');
})

$$(document).on('page:init', '.page[data-name="categorias"]', function (e) {
    console.log('Cargo CATEGORIAS');
})

$$(document).on('page:init', '.page[data-name="fondos"]', function (e) {
    console.log('Cargo FONDOS');
    $$("[id^='f']").on('click', fnCambiarFondo)

})

$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
    console.log('Cargo PERFIL');
})
    
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    console.log('Cargo ABOUT');
})

/* SEMBRADO */  
function sembrarDatos() {

    var dato = { rol: "Desarrollador/a", color: "Verde" }
    var miId = "DEV";
    colRoles.doc(miId).set(dato)
    .then( function(docRef) {
        console.log("Doc creado con el id: " + docRef.id);
    })
    .catch(function(error) {
        console.log("Error: " + error);
    })
}




/* MIS FUNCIONES */

var nombre, apellido, email, clave;

//CODIGO DE LOGIN:
    // cada un@ pone su magia para recuperar el mail y la clave de un form...

    function fnIniciarSesion() {
        email = $$("#loginEmail").val();
        clave = $$("#loginClave").val();

        if (email!="" && clave!="") {

            firebase.auth().signInWithEmailAndPassword(email, clave)
              .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("Bienvenid@!!! " + email);

                mainView.router.navigate('/home/');
                // ...
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.error(errorCode);
                    console.error(errorMessage);
              });
        }
    }
    
    

    //CÓDIGO PARA EL REGISTRO

    // cada un@ pone su magia para recuperar el mail y la clave de un form...
    function fnRegistro() {
        email = $$("#indexEmail").val();
        clave = $$("#indexClave").val();
    
        if (email!="" && clave!="") {

            firebase.auth().createUserWithEmailAndPassword(email, clave)
                
                .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("Bienvenid@!!! " + email);
                // ...
                mainView.router.navigate('/registro/');
                })
                .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.error(errorCode);
                console.error(errorMessage);

                if (errorCode == "auth/email-already-in-use") {
                    console.error("Este email ya esta en uso");
                }
            })
        };
    }


    function fnFinRegistro() {
        nombre = $$("#regNombre").val();
        apellido = $$("#regApellido").val();
    
        if (nombre!="" && apellido!="") {
            mainView.router.navigate("/confirmacion/")
    
            datos = { nombre: nombre, apellido: apellido, rol: "DEV" }
            elID = email;
    
            colPersonas.doc(elID).set(datos)
            .then( function(docRef) {
               mainView.router.navigate("/confirmacion/") 
            })
            .catch(function(error) {
                console.log("Error: " + error);
            })
    
    
        }
    }

    function cargarUsuariosEjemplo() {
        colPersonas.get()
        .then( function(qs) {
            qs.forEach( function(elDoc) {
                nombre = elDoc.data().nombre;
                apellido = elDoc.data().apellido;
                rol = elDoc.data().rol;
                email = elDoc.id;
                $$("#listaUsuarios").append("<hr>" + nombre + " / " + apellido + " / " + rol + " / " + email);
            } )
        })
        .catch(function(error) {
            console.log("Error: " + error);
        })
    
    }
    
    function cargarDatosUsuarioLogueado() {
        colPersonas.doc(email).get()
        .then( function(unDoc) {
            //console.log(unDoc);
            nombre = unDoc.data().nombre;
            apellido = unDoc.data().apellido;
            rol = unDoc.data().rol;
            email = unDoc.id;
            $$("#infoDatos").html("<hr>" + nombre + " / " + apellido + " / " + rol + " / " + email);
        } )
        .catch(function(error) {
            console.log("Error: " + error);
        })
    }

    //Cambiar Fondo de Pantalla
    function fnCambiarFondo(){
        var imagenURL = $$(this).data("image");
        $$(".background-image").css("background-image", "url(" + imagenURL + ")");
    }
    