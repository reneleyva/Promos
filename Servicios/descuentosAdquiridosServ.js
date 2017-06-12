var app = angular.module("descuentosAdquiridos");
// Configuracion inicial del servicio

// Se crea la logia del controlador como un servicio  para que el sistema no dependa de el controlador
// En ese momento si se quieren rescribir las funciones se cambia de servicio y no se modifica el 
// controlador
app.factory('DescuentosAdquiridosUsuario',DescuentosAdquiridosUsuario);
//DescuentosAdquiridosUsuario.$inject= ["$firebaseObject"]; 
function DescuentosAdquiridosUsuario () {
    //var ref = firebase.database().ref("promos/DescuentosUsuarios");
    //var objeto = $firebaseObject(ref);
    //const rootRef = firebase.database().ref().child('promos');
        //La subbase descuentos
        // La subbase de Descuentos Usuario
      //  const descuentosObtenidos = rootRef.child('DescuentosUsuarios');
     
    
    var nombre = "Mi primer servicio";
    var lista = {}; 
    var listar = function (){ return lista;};
    var regresaReferencia = function(){
        return ref;
    };
    var regresaListaDescUsuario = function(objeto){
        //var objeto = $firebaseObject(descuentosObtenidos);
       //var flag = false; 
       //setTimeout(function(objeto){
            console.log(objeto);
        angular.forEach(objeto, function(value, key) {

       console.log(value.usuarioID + "      " + sessionStorage.id);
        if (value.usuarioID.trim() == sessionStorage.id.trim() ) {
            lista.push(value)
        }
        });
      // }, 1000);
   
   
   
        
        return lista;
    };
    //var listar = function(){
      //  return lista;
    //};
    var getNombre = function(){
        return nombre;
    };
    //var listar = function (){ return playlist;};
    //var borrar = function (id){playlist.splice(id,1);};
    
    return {
        regresaReferencia : regresaReferencia,
        regresaListaDescUsuario : regresaListaDescUsuario,
        listar : listar,
        getNombre : getNombre
        //listar: listar,
        //borrar: borrar
    };
}