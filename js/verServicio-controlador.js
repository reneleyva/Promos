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
    .module('verServicio-app', ['firebase'])
    .controller('verServicio-controlador', function($scope, $firebaseObject){
        //La base de datos principal
        const rootRef = firebase.database().ref().child('promos');
        //La subbase servicios
        const servicios = rootRef.child('servicios'); 
        //La subbase restaurantes
        const restaurantes = rootRef.child('restaurantes');   
        //La subbase postales
        const postales = rootRef.child('postales');  

        //Lista de descuentos desde firebase      
        $scope.listaServicios = $firebaseObject(servicios);
        //Lista de descuentos desde firebase      
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
        
        /* Evento del boton obtener del popup 
        * Valida los datos del formulario y si son validos los guarda en la BD. 
        */
        $scope.obtenerDescuentoOnClick = function() {
          if (sessionStorage.getItem('id') !== null) {
            //Validar form
            var err = $('.campos-msg');
            err.hide();
            var selected = $('#opciones').val();
            var fecha = $('#fecha').val();
            var hora = $('#hora').val();
            var date = new Date(fecha);
            date.setHours(hora.split(":")[0], hora.split(":")[1]);
            console.log(date);
            // console.log("sele: " + selected  + " fecha: " + fecha + " hora: " + hora);

            if (selected === "" | fecha === "" | hora === "") {
              err.text("Por favor llena todos los campos");
              err.show('fast');
            } else if (date.getDay() == 6) {
              //No abren los domingos
              err.text("Ningún establecimiento abre los domingos");
              err.show('fast');
              
            } else if (date.getHours() >= 22) {
              //Muy tarde
               err.text("Muy tarde para atenderte. Horarios sólo antes de las 10pm");
              err.show('fast');
            } else if (date.getHours() < 8) {
              //Muy temprano
               err.text("Muy temprano para atenderte. Horarios solo después de las 8am");
              err.show('fast');
            } else {
              //Agendo la cita
              var db = firebase.database();
              var ref = db.ref("promos");
              var citas = ref.child("citas/");
              citas.push({
                  idUsuario: sessionStorage.getItem('id'),
                  idDescuento: $scope.key,
                  nombreUsuario: sessionStorage.getItem('nombre'),
                  servicio: selected,
                  fecha: fecha,
                  hora: hora
              });

              localStorage.setItem($scope.key, $('#descuento').data('descuento'));
              $scope.closePopUp();
            }
            
          } else {
            
            location.href = "registrarse.html";
          }
        };


        $scope.descuentoObtenido = function() {
          return localStorage.getItem($scope.key) !== null;
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
          //agrega las opciones de servicio al popup
          var select = $('#opciones');
          var raw = select.data('opciones');
          var clean = raw.replace(/[.*+?^${}()|[\]\\]/g, "");
          opciones = clean.split(",");
          for (var i = 0; i < opciones.length; i++) {
            select.append(
              $('<option></option>').val(opciones[i]).html(opciones[i])
            );
          }
          select.data('opciones', '');
          
          $('select').material_select();
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
          localStorage.clear();
          window.location.reload(false); 
        };
        
    });
}());