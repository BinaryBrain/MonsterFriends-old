// Additional JS functions here

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
	    console.log("just connected")
	    testAPI()
        } else {
            // cancelled
	    console.log("canceled")
        }
    })
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '286327544834291', // App ID
    channelUrl : '//monsterfriends.no-ip.org:5000//channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // connected
      console.log('already connected')
      testAPI()
    } else if (response.status === 'not_authorized') {
      // not_authorized
      console.log('not authorized')
      login()
    } else {
      // not_logged_in
      console.log('not logged in')
      login()
    }
  })
}

// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
}
