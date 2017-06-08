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

angular
    .module('principal', ['firebase'])
    .controller('MyCtrl', function($scope, $firebaseObject){
        sessionStorage.name = "Rene";
        //La base de datos principal
        const rootRef = firebase.database().ref().child('promos');
        //La subbase descuentos
        const descuentos = rootRef.child('descuentos');  
        //La subbase servicios
        const servicios = rootRef.child('servicios'); 
        //La subbase restaurantes
        const restaurantes = rootRef.child('restaurantes'); 

        //Lista de descuentos desde firebase      
        $scope.listaDescuentos = $firebaseObject(descuentos); 
        //Lista de servicios desde firebase      
        $scope.listaServicios = $firebaseObject(servicios);
        //Lista de restaurantes desde firebase      
        $scope.listaRestaurantes = $firebaseObject(restaurantes);


        /* Funcion para evento cuando hagan click en algún descuento 
         * @param el key o id del descuento en la base de dtaos
        */
        $scope.onClickCardDescuento = function(key, tipo) {
          if (tipo === "producto")
            location.href = "verProducto.html?key="+key;
          else if (tipo === "servicio")
            location.href = "verServicio.html?key="+key;
          else 
            location.href = "verRestaurante.html?key="+key;
        };
        /* Convierte un objeto con llaves en un arreglo
        * de objetos descuentos.
        */
        $scope.toArray = function(lista) {
          var result = [];
          angular.forEach(lista, function(value, key) {
              value['key'] = key;
              result.push(value);
          });
          return result;
        };

    

        var flag = false;
        $scope.searchToggle = function() {
          if (flag) {
              //lo oculto
              $(this).find('i').text('search');
              $('.search').slideUp('fast');
              flag = false;
            } else {
              //Lo muestro
              $(this).find('i').text('clear')
              $('.search').slideDown('fast');
              $('.search').find('input[type="text"]').focus();
              flag = true;
            }
        };

        $scope.nombre = sessionStorage.nombre;

        $scope.logOut = function() {
          firebase.auth().signOut();
          sessionStorage.clear();
          localStorage.clear();
          window.location.reload(false); 
        };

        /* Regresa True si el usuario ha iniciado sesión */
        $scope.userLogedIn = function() {
          return (typeof sessionStorage.id == 'undefined');
        };
    });
}());