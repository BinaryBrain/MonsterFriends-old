Facebook = {
  userID: 0,
  myname: 0,
  
    getFriends;
}

function login() {
  FB.login(function(response) {
      if (response.authResponse) {
	  // connected
	  go()
      } else {
	  // cancelled
	  console.log("Connection cancelled")
      }
  });
}

function go() {
  FB.api('/me', function(response) {
      console.log(response)
      Facebook.userID = response.id
      Facebook.myname = response.first_name
      
      $("#facebookconnect").html("Hi, "+Facebook.myname)
      
      Network.facebookReady(Facebook.userID)
  });
}

$(function () {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '286327544834291', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    
    FB.getLoginStatus(function(response) {
      console.log(response.status)
      if (response.status === 'connected') {
	// connected
	go()
      } else if (response.status === 'not_authorized') {
	// not_authorized
	login()
      } else {
	// not_logged_in
	login()
      }
    });
  };

  // Load the FB SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
  } (document));
})
