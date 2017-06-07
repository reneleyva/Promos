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
    .module('app', ['firebase'])
    .controller('MyCtrl', function($scope, $firebaseObject){
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

        /* Convierte un objeto con llaves en un arreglo
        * de objetos descuentos.
        */
        $scope.toArray = function(lista) {
          var result = [];
          angular.forEach(lista, function(value, key) {
              result.push(value);
          });
          return result;
        };
        // this.lista = [];
        // for (var key in this.object) {
        //   this.lista.push(object[key]);
        // }
    });
}());































/*SHIT*/
// function agregaInfoProductos(obj) {
// 	var list = [];
// 	for (var key in obj) {
// 		obj[key].key = key;
// 		list.push(obj[key]);
// 		// console.log(obj[key]);
// 	}

	
// 	$("#productos .card").each( function(i) {
//      	$(this).find('.key').val(list[i].key);
//      	$(this).find('img').attr("src", list[i].imagenUrl);
//      	$(this).find('.sale').text("-"+list[i].descuento+"%");
//      	$(this).find('.titulo').text(list[i].titulo);
// 	});
	
// }

// function agregaInfoServicios(obj) {
// 	var list = [];
// 	for (var key in obj) {
// 		obj[key].key = key;
// 		list.push(obj[key]);
// 		console.log(obj[key]);
// 	}

// 	$("#servicios .card").each( function(i) {
//      	$(this).find('.key').val(list[i].key);
//      	$(this).find('img').attr("src", list[i].imagenUrl);
//      	$(this).find('.sale').text("-"+list[i].descuento+"%");
//      	$(this).find('.titulo').text(list[i].titulo);
// 	});
	
// }

// function agregaInfoRestaurantes(obj) {
// 	var list = [];
// 	for (var key in obj) {
// 		obj[key].key = key;
// 		list.push(obj[key]);
// 		console.log(obj[key]);
// 	}

// 	$("#restaurantes .card").each( function(i) {
//      	$(this).find('.key').val(list[i].key);
//      	$(this).find('img').attr("src", list[i].imagenUrl);
//      	$(this).find('.sale').text("-"+list[i].descuento+"%");
//      	$(this).find('.titulo').text(list[i].titulo);
// 	});
	
// }


// jQuery(document).ready(function($) {
// 	// Initialize Firebase
// 	var config = {
// 		apiKey: "AIzaSyBjz3yZP8fQTWBWLmqhJkiPeU8XFKawzeM",
// 		authDomain: "promos-c3fbe.firebaseapp.com",
// 		databaseURL: "https://promos-c3fbe.firebaseio.com",
// 		projectId: "promos-c3fbe",
// 		storageBucket: "promos-c3fbe.appspot.com",
// 		messagingSenderId: "258104913182"
// 	};
// 	firebase.initializeApp(config);

// 	var db = firebase.database();
// 	var ref = db.ref("promos");

// 	ref.on("value", function(snapshot) {
// 	  console.log(snapshot.val());
// 	  agregaInfoProductos(snapshot.val().descuentos);
// 	  agregaInfoServicios(snapshot.val().servicios);
// 	  agregaInfoRestaurantes(snapshot.val().restaurantes);

// 	}, function (errorObject) {
// 	  console.log("The read failed: " + errorObject.code);
// 	});

// 	$('#productos .card').click(function() {
// 		var key = $(this).find('.key').val();
// 		location.href = "verProductos.html?key="+key;
// 		// alert($(this).find('.key').val());
// 	});

// 	$('#servicios .card').click(function() {
// 		var key = $(this).find('.key').val();
// 		location.href = "verServicios.html?key="+key;
// 	});

// 	$('#restaurantes .card').click(function() {
// 		var key = $(this).find('.key').val();
// 		location.href = "verServicios.html?key="+key;
// 	});
// });