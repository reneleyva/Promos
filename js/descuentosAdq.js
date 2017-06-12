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
        $scope.id = sessionStorage.id;
        //La base de datos principal
        const rootRef = firebase.database().ref().child('promos');
        //La subbase descuentosUsuarios
        const descuentos = rootRef.child('DescuentosUsuarios');  
        //La subbase citas
        const citas = rootRef.child('citas'); 
        $scope.nombre = sessionStorage.nombre;
        //Lista de descuentos desde firebase      
        $scope.lista = $firebaseObject(descuentos); 
        $scope.listaCitas = $firebaseObject(citas); 
        /**
         * @return true si el descuento/cita fue adquirido por el usuario   
         */
        $scope.estaObjeto = function(objeto){
          if(objeto.usuarioID ==$scope.id ){
            return true;
          }else{
            return false;
          }
        }
        $scope.toArray = function(lista) {
          var result = [];
          angular.forEach(lista, function(value, key) {
              value['key'] = key;
              result.push(value);
          });
          return result;
        };
        /**
         * Cerrar sesion activa 
         */
        $scope.logOut = function() {
          firebase.auth().signOut();
          sessionStorage.clear();
          localStorage.clear();
          window.location.reload(false); 
          location.href = "index.html";          
          
        };
        /**
         * Metodo para cancelar la cita ya agendada 
         */
        $scope.cancelar = function(objeto){
          //console.log(objeto.key);
           
          //Lista de descuentos desde firebase       
          var lista = $firebaseObject(citas.child(objeto.key)); 
          confirmar=confirm("¿Quieres cancelar la cita?"); 
          if (confirmar) {
            // si pulsamos en aceptar
            alert('cita cancelada');
            lista.$remove(); 
        }
        }
        /**
         * Metodo para entrar a la pagina de carrito de compras 
         */
        $scope.carritoCompras = function() {
          location.href = "verDescuentosAdquiridos.html";
        };
        
    });
}());