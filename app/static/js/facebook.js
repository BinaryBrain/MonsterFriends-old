Facebook = {
  userID: 0,
  myname: 0,
  val: [],

  getFriends: function(renderMFS){
                 FB.api('/me/friends?fields=installed', function(response){
                  for(var i = 0; i < response.data.length; i++){                      if(response.data[i].installed !== undefined){
                val.push(response.data[i].id);
                    }
                      }
                renderMFS();
             });



    function renderMFS() {
          // First get the list of friends for this user with the Graph API
            FB.api('/me/friends', function(response) {
            var container = document.getElementById('mfs');
             var mfsForm = document.createElement('form');
               mfsForm.id = 'mfsForm';

            // Iterate through the array of friends object and create a checkbox for each one.
              for(var i = 0; i < response.data.length; i++) {
                 for(var j = 0; j < val.length; j++){
                 var friendItem;
                    if(response.data[i].id == val[j]){

                        friendItem = document.createElement('span');
                       friendItem.innerHTML = '<input type="checkbox" name="friends" id="friends" value="'
                                + response.data[i].id
                               + '" />' + response.data[i].name + "<br>";

                                              friendItem.id = 'friend_' + response.data[i].id;

                                              mfsForm.appendChild(friendItem);
                                          }
                                      }
                                  }
                                  container.appendChild(mfsForm);

                                  // Create a button to send the Request(s)
                                  var sendButton = document.createElement('input');
                                  sendButton.type = 'button';
                                  sendButton.id = "sendNoti";
                                  sendButton.value = 'Send Request';
                                  sendButton.onclick = getCall;
                                  mfsForm.appendChild(sendButton);
                              });
                          }

                            function getCall(){

                                var inputs = document.getElementsByName("friends");;

                                for(var x = 0; x < inputs.length; x++) {
                                    if(inputs[x].type == 'checkbox') {
                                        if(inputs[x].checked){
                                            console.log(inputs[x].value);
                                            FB.ui({method: 'apprequests',
                                                message: 'Lets play a game',
                                                to: inputs[x].value
                                            },
                                                    function (response) {
                                                        // If response is null the user canceled the dialog
                                                        if (response != null) {
                                                          console.log(response);                     }
                                                    });
                                        }
                                    }
                                }
                            }
  }
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
