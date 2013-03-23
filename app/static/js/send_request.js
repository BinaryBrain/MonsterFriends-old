$(function(){
	$('#sendRequest').click(function() {
	          FB.ui(
	            {
	              method  : 'apprequests',
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