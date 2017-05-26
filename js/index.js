jQuery(document).ready(function($) {
	 $('.button-collapse').sideNav();
	 $('.carousel.carousel-slider').carousel({fullWidth: true});

	 var flag = false; 
	 $('#search-icon').click(function(e) {
	 	e.preventDefault();
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
	 	
	 });
});