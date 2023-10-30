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

/*<script>
  export default (props, { $f7, $on }) => {
    const photos = [
      {
        url: 'img/logo.png',
        caption: 'Amazing beach in Goa, India'
      },
      'http://placekitten.com/1024/1024',
      'img/lock.jpg',
      {
        url: 'img/monkey.jpg',
        caption: 'I met this monkey in Chinese mountains'
      },
      {
        url: 'img/mountains.jpg',
        caption: 'Beautiful mountains in Zhangjiajie, China'
      }
    ];
    const thumbs = [
      'img/beach.jpg',
      'http://placekitten.com/1024/1024',
      'img/lock.jpg',
      'img/monkey.jpg',
      'img/mountains.jpg'
    ]

    let page;
    
    const openPage = () => {
      page.open();
    }
   
    $on('pageInit', () => {
      // Create PBs when page init
      page = $f7.photoBrowser.create({
        photos: photos,
        thumbs: thumbs,
        type: 'page',
        backLinkText: 'Back',
      });
      
        
    $on('pageBeforeRemove', () => {
      // Destroy PBs on page remove
      standalone.destroy();
      popup.destroy();
      page.destroy();
      standaloneDark.destroy();
      popupDark.destroy();
      pageDark.destroy();
    });

    return $render;
  };
</script>*/