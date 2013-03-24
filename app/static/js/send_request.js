$(function(){
	$('#sendRequest').click(function() {
	          FB.ui(
	            {
	              method  : 'apprequests',
	              max_recipients:1,
	              message : $(this).attr('data-message')
	            },
	            function (response) {
	              // If response is null the user canceled the dialog
	              if (response != null) {
	                logResponse(response);
	              }
	            }
	          );
	        });
	      });


/*	Add this anchor

<a href="#" class="facebook-button apprequests" id="sendRequest" data-message="Join me for a fight!">
                <span class="apprequests">Send Request</span></a>

*/