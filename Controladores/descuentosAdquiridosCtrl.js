var app = angular.module("descuentosAdquiridos");

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

}