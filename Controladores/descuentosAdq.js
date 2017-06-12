/*var config = {
    apiKey: "AIzaSyB5g_GBnMEewajWj0VGCk-24b-kp2RKSG0",
    authDomain: "servicioscodigopostal.firebaseapp.com",
    databaseURL: "https://servicioscodigopostal.firebaseio.com",
    projectId: "servicioscodigopostal",
    storageBucket: "servicioscodigopostal.appspot.com",
    messagingSenderId: "1027209434018"
  };
  firebase.initializeApp(config);
var app = angular.module('descuentosAdquiridos',['firebase']);


app.controller('descuentosAdquiridosCtrl', descuentosAdquiridosCtrl);

descuentosAdquiridosCtrl.$inject = [ '$scope', '$firebaseObject', '$firebaseArray' ];

//descuentosAdquiridosCtrl.$inject = [ '$scope' ,'DescuentosAdquiridosUsuario','$firebaseObject' ] ;

//function descuentosAdquiridosCtrl($scope ,DescuentosAdquiridosUsuario,$firebaseObject){

function descuentosAdquiridosCtrl($scope ,$firebaseObject ,$firebaseArray ){
    // Contenido del controlador
    
    //console.log(DescuentosAdquiridosUsuario.nombre);
    $scope.nombre = sessionStorage.nombre;//sessionStorage.id 
    //$scope.osad  = sessionStorage.id ;
    const rootRef = firebase.database().ref().child('promos');
        //La subbase descuentos
        // La subbase de Descuentos Usuario
        const descuentosObtenidos = rootRef.child('citas');
    $scope.lista = $firebaseArray(descuentosObtenidos);
    //console.log($scope.osad);
    //$scope.osad  = DescuentosAdquiridosUsuario.regresaListaDescUsuario($scope.lista);

}*/

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
    .module('descuentosAdquiridos', ['firebase'])
    .controller('descuentosAdquiridosCtrl', function($scope, $firebaseObject){
        //sessionStorage.name = "Rene";
        $scope.id = sessionStorage.id;
        //La base de datos principal
        const rootRef = firebase.database().ref().child('promos');
        //La subbase descuentos
        const descuentos = rootRef.child('DescuentosUsuarios');  
        //La subbase servicios
        const citas = rootRef.child('citas'); 
        //La subbase restaurantes
        //const restaurantes = rootRef.child('restaurantes'); 

        //Lista de descuentos desde firebase      
        
        $scope.lista = $firebaseObject(descuentos); 
        $scope.listaCitas = $firebaseObject(citas); 
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
        $scope.estaObjeto = function(objeto){
          //console.log(objeto);
          if(objeto.usuarioID ==$scope.id ){
            return true;
          }
        }
    

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
          location.href = "index.html";          
          
        };
        $scope.carritoCompras = function() {

          location.href = "verDescuentosAdquiridos.html";

        };
        /* Regresa True si el usuario ha iniciado sesión */
        $scope.userLogedIn = function() {
          return (typeof sessionStorage.id == 'undefined');
        };
    });
}());