var name;
var userID;
var gender;

window.fbAsyncInit = function() {
		        FB.init({
		          appId      : '286327544834291', // App ID
		          status     : true, // check login status
		          cookie     : true, // enable cookies to allow the server to access the session
		          frictionlessRequests: true,
		          xfbml      : true // parse XFBML
        		});

                  FB.getLoginStatus(function(response) {

                      if ((response.status)&&(response.status=='connected')) {
                          userID = response.authResponse.userID
                          getDetails(userID);
                      } else if (response.status === 'not_authorized') {
                          // not_authorized
                          alert("Not authorized");
                      } else {

                      }
                  });

                  function getUserID(){
                  	return userID;
                  }

                  function getDetails(userID){

                  $.getJSON('http://graph.facebook.com/' + userID, function(data){ 
                  	name = data["name"];
                  	gender = data["gender"];
                  });
              }
    	}
                 // Load the SDK Asynchronously
                      (function(d, s, id) {
                          var js, fjs = d.getElementsByTagName(s)[0];
                          if (d.getElementById(id)) return;
                          js = d.createElement(s); js.id = id;
                          js.src = "//connect.facebook.net/en_US/all.js";
                          fjs.parentNode.insertBefore(js, fjs);
                      }(document, 'script', 'facebook-jssdk'));