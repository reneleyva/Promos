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
        //La subbase postales
        const postales = rootRef.child('postales');  

        //Lista de descuentos desde firebase      
        $scope.listaDescuentos = $firebaseObject(descuentos);
        //Lista de codigos postales desde firebase      
        $scope.postales = $firebaseObject(postales);
        //La llave proporcionada en la URL.  
        $scope.key = getKey();

        /* Valida el código postal que se da como argumento
         * @return -1 si no es válido. 
         * @return 0 si es válido pero no está en la base de datos
         * @return 1 si es válido y está en la base de datos.
         */ 
        $scope.validaCp = function(cp) {
            var exp = /\d\d\d\d\d/;
            //Los mensajes que le muestran al usuario. 
            var valido = $('.valido-msg');
            var noRegistrado = $('.no-registrado-msg');
            var err = $('.err-msg');
            var adicional = 0;

            valido.hide();
            noRegistrado.hide();
            err.hide();
            //Se testea codigo
            if (exp.test(cp)) {
              var flag = false;
              angular.forEach($scope.postales, function(value, key) {
                if (key == cp) {
                  adicional = value.adicional;
                  flag = true;
                }
              });

              if (flag) {
                //Se muestra otro boton de aceptar cuando tiene descuento adicional 
                $('#obtener').hide();
                $('#aceptar').show();
                //Coidgo postal en la BD
                valido.text("Código Válido Descuento Adcional del "+adicional+"%");
                valido.show();
              } else {
                //NO registrado. 
                noRegistrado.show();
              }
              
            } else {
              err.show();
            }
        };
        /* Al chechar el checkbox en el pop up 
        *  hace aperecer el input */
        $scope.checkBoxChecked = function() {
          $('.msg').hide();
          $('.añadir').toggleClass('codigoP');
          $('#cp').focus();
        };

        /* Función evento para cerrar pop-up */
        $scope.closePopUp = function() {
          $('.cd-popup').removeClass('is-visible');
          $('body').css('overflow', 'visible');
        };

        /* Cuando se hace click en boton Obtener despliega
         pop up para meter codigo postal. */
        $scope.onClickBotonObtener = function() {
          $('.cd-popup').addClass('is-visible');
          $('body').css('overflow', 'hidden');
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