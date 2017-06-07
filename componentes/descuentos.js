var app = angular.module("descuentosApp", ["firebase"]);
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB5g_GBnMEewajWj0VGCk-24b-kp2RKSG0",
    authDomain: "servicioscodigopostal.firebaseapp.com",
    databaseURL: "https://servicioscodigopostal.firebaseio.com",
    projectId: "servicioscodigopostal",
    storageBucket: "servicioscodigopostal.appspot.com",
    messagingSenderId: "1027209434018"
  };
  firebase.initializeApp(config);


app.controller("descuentosController", ["$scope", "$firebaseArray", "$firebaseObject",
  function($scope,$firebaseArray,$firebaseObject) {
    var ref = firebase.database().ref("Descuentos");
    $scope.filtro = {categoria : 'Servicios'};
    
    // Variable que  lee a que categoria pertenece el bien solicitado
    var e = $scope.filtro.categoria;
    //console.log(e);
    var Pref = firebase.database().ref(e);
    $scope.dato ;
    $scope.auxiliar;
    //var alert;
    $scope.servicios = false;
    $scope.descuentos = $firebaseArray(ref);
    //$scope.objeto = $firebaseObject(Pref);
    $scope.objeto;
    $scope.verPublicacion = function(publicacion){
      e = $scope.filtro.categoria;
      //console.log(e);
      if(e=='Servicios'){
        $scope.servicios = false;
        Pref = firebase.database().ref(e).child("ServiciosMéxico").child(publicacion.bienID);
        $scope.objeto = $firebaseObject(Pref);
        var est = $scope.objeto;
        //console.log(est);
        var Eref= firebase.database().ref("Establecimientos").child(publicacion.establecimiento);
        $scope.auxiliar = $firebaseObject(Eref);
    }else{
        $scope.servicios = true;
        Pref = firebase.database().ref(e).child(publicacion.bienID);
        $scope.objeto = $firebaseObject(Pref);
      }
      

      console.log(publicacion);
      $scope.dato = publicacion;
    
    
  }

    
  }
]);

