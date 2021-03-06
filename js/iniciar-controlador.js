/* Controlador para verPrducto
 * Agrega los datos necesarios a las vistas. 
 */


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
  //REAL TIME
  auth.onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      // sessionStorage.id = firebaseUser.uid;
      // sessionStorage.nombre = 
    } else {
      console.log("No logeado");
    }
  });

angular
    .module('iniciar-app', ['firebase'])
    .controller('iniciar-controlador', function($scope, $firebaseObject){
      

      //La base de datos principal
      const rootRef = firebase.database().ref().child('promos');
      //La subbase usuarios
      const usuarios = rootRef.child('usuarios');  
      //Lista de descuentos desde firebase      
      $scope.listaUsuarios = $firebaseObject(usuarios);
      //Google Auth
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');

      $scope.valida = function(email, pass) {

          var err = $('#correo-err');
           auth.signInWithEmailAndPassword(email, pass)
           .then(function(user) {
            //EXITO!
            console.log(user.uid);
            angular.forEach($scope.listaUsuarios, function(value, key) {
                console.log(value.nombre);
                if (value.id == user.uid) {
                  sessionStorage.nombre = value.nombre;
                }
            });
            sessionStorage.id = user.uid;
            location.href = "index.html";            

           }).catch( function(error) {
              //Error
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/user-not-found' | errorCode == 'auth/wrong-password') {
                err.show('fast');
              }
              console.log(errorCode);
           });


        };

        $scope.logInGoogle = function() {
            firebase.auth().signInWithPopup(provider).then(function(result) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              
              sessionStorage.id = user.uid;
              sessionStorage.nombre = user.displayName;
              location.href = "index.html";  

            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage);
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        };

    });
}());