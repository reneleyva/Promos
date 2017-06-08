/* Función IFFE para el controlador*/
(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBjz3yZP8fQTWBWLmqhJkiPeU8XFKawzeM",
    authDomain: "promos-c3fbe.firebaseapp.com",
    databaseURL: "https://promos-c3fbe.firebaseio.com",
    projectId: "promos-c3fbe",
    storageBucket: "promos-c3fbe.appspot.com",
    messagingSenderId: "258104913182"
  };
  firebase.initializeApp(config);

  const auth = firebase.auth(); //Para autenticar

  //IMprime en consola el usuario actual logeado
  auth.onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log("No logeado");
    }
  });

angular
    .module('registrarse-app', ['firebase'])
    .controller('registrarse-controlador', function($scope, $firebaseObject){

      /* Funcion para validar formulario de registro */
      $scope.validaFormulario = function(nombre, correo, pass1, pass2) {

          var passError = $('#pass-err');
          var correoError = $('#correo-existe');
          passError.hide();
          correoError.hide();
          if (pass1.length < 6 | pass2 < 6) {
            passError.text('La contraseña debe de ser por lo menos 6 caractares');
            passError.show('fast');
          } else if (pass1 !== pass2) {
            passError.text('Las contraseñas no coiciden');
            passError.show('fast');
          } else {
            //Sin errores guardo nuevo usuario
            $scope.guardaNuevoUsuario(correo, pass1, nombre);
          }


        };

        /* Función para guardar nuevo usaurio */
        $scope.guardaNuevoUsuario = function(email, pass, nombre) {
          
          const promise = auth.createUserWithEmailAndPassword(email, pass)
            .then(function (user) {
              //Exito registrando el usuario
             var usersRef = firebase.database().ref('promos').child('usuarios');
             //Guardo en un registro aparte con nombre y id. 
              usersRef.push({
                id: user.uid,
                correo: user.email,
                nombre: nombre
              });

              $scope.iniciaSesion(email, pass);
              sessionStorage.id = user.uid;
              sessionStorage.nombre = nombre;
              location.href = "index.html";
            })
            .catch( function(error) {
              //Error
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode === 'auth/email-already-in-use') {
                  $('#correo-existe').show('fast');
                }
                console.log(errorCode);
          });
          promise.catch( e => console.log(e.message));

          
        };

        /* Inicia sesión maybe */
        $scope.iniciaSesion = function(email, pass) {
          const promise = auth.signInWithEmailAndPassword(email, pass);
        };

    });
}());