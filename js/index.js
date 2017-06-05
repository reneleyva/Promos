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

	 $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      	// console.log($(window).scrollTop())
		if ($(window).scrollTop() > 400) {
			// console.log("Fixed");
		  $('#tabs').addClass('fixed');
		}
		if ($(window).scrollTop() < 401) {
		  $('#tabs').removeClass('fixed');
		}
		});

	 
});