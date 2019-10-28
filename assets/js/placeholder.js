
$(document).ready(function(){
	
	$('input[type="text"], textarea').each(function() {
		$(this).val( $(this).attr('placeholder') );
    });
	
});