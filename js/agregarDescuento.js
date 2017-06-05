jQuery(document).ready(function($) {
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

	var db = firebase.database();
	var ref = db.ref("promos");

	
	$('#foto').change( e => {
			var file = e.target.files[0];
			var storageRef = firebase.storage().ref('mis_fotos/' + file.name);
			var task = storageRef.put(file);
	});

	$('#agregar').submit(function(e) {
		e.preventDefault();
		var titulo = $('#titulo').val();
		var descripcion = $('#descripcion').val();
		var descuento = $('#descuento').val();
		// var file = $('#foto').prop('files')[0];
		var url = $('#url').val();
		var usersRef = ref.child("descuentos/");

		usersRef.push({
			titulo: titulo,
			descripcion: descripcion,
			descuento: descuento,
			imagenUrl: url
		});

		// var storageRef = firebase.storage().ref('mis_fotos/' + file.name);
		// var task = storageRef.put(file);
		window.location.reload(false); 
	});
});