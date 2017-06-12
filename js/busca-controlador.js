/* Controlador para verPrducto
 * Agrega los datos necesarios a las vistas. 
 */

/* Regresa los datos en el url por GET */
function getKey() {
	return (window.location.search.substr(1).split("=")[1]);
}

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
    .module('busca-app', ['firebase'])
    .controller('busca-controlador', function($scope, $firebaseObject){
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

        //La llave proporcionada en la URL.  
        $scope.q = getKey();
        
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

        /* Oculta y muestra la bbara de busqueda */
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

        //Nombre del usuario si hay
        $scope.nombre = sessionStorage.nombre;
        /* Sale del sistema */
        $scope.logOut = function() {
          firebase.auth().signOut();
          sessionStorage.clear();
          window.location.reload(false); 
          localStorage.clear();
        };
        
        $scope.carritoCompras = function() {

          location.href = "verDescuentosAdquiridos.html";

        }; 
    });
}());

jQuery(document).ready(function($) {
  $('#search').focus();
});
