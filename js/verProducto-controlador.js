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
    .module('verProducto-app', ['firebase'])
    .controller('verProducto-controlador', function($scope, $firebaseObject){
        //La base de datos principal
        const rootRef = firebase.database().ref().child('promos');
        //La subbase descuentos
        const descuentos = rootRef.child('descuentos');  

        //Lista de descuentos desde firebase      
        $scope.listaDescuentos = $firebaseObject(descuentos);
        //La llave proporcionada en la URL.  
        $scope.key = getKey();

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
        
    });
}());





























/* SHIIIET */
// var codigos = null;
// var adicional = 0;
// function getKey() {
// 	return (window.location.search.substr(1).split("=")[1]);
// }

// function addInfo(obj) {
// 	var key = getKey();
// 	var descuento = null;
// 	for (var k in obj) {
// 		if (key === k) {
// 			descuento = obj[k];
// 		}
// 	}

// 	console.log(descuento);
// 	$('.img-producto').attr('src', descuento.imagenUrl);
// 	$('.titulo').text(descuento.titulo);
// 	$('.descuento').text("-"+descuento.descuento+"%");
// 	$('#descripcion').text(descuento.descripcion);
// }

// function validaCodigo(cp) {
// 	var valido = /\d\d\d\d\d/;
// 	return valido.test(cp);
// }

// function consultaDescuentoAdicional(cp) {
// 	for (var key in codigos) {
// 		if (key === cp) {
// 			console.log("TRUE");
// 			return codigos[key].adicional;
// 		}
// 	}
// 	return 0;
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
// 	 	addInfo(snapshot.val().descuentos);
// 	 	codigos = snapshot.val().postales;
// 	}, function (errorObject) {
// 	  console.log("The read failed: " + errorObject.code);
// 	});

// 	$('#obtener').click(function(e) {
// 		$('.valido-msg').hide();
// 		$('.err-msg').hide();
// 		$('.no-registrado-msg').hide();
// 		var cp = $('.cd-popup').find('#cp').val();	
// 		if (!validaCodigo(cp)) {
// 			$('.err-msg').show();
// 		} else {
			
// 			adicional = consultaDescuentoAdicional(cp);

// 			if (adicional == 0) {
// 				$('.no-registrado-msg').show();
// 			} else {
// 				$('.valido-msg').text("Descuento Adicional del "+adicional+"%");
// 				$('.valido-msg').show();
// 				$(this).hide();
// 				$('#aceptar').show();
// 			}
// 		}
// 		// $('.cd-popup').find('.titulo').text("Yeah");
// 	});
// 	var agregado = false;
// 	$('#aceptar').click(function() {
// 		var desc = parseInt($('.descuento').text());
// 		var nuevo = desc - adicional;
// 		if (!agregado) {
// 			$('.descuento').text(String(nuevo)+"%");
// 			agregado = true;
// 		}
// 	});
// });