       getFriends: function(renderMFS){
                 FB.api('/me/friends?fields=installed', function(response){
                 		for(var i = 0; i < response.data.length; i++){
                 			if(response.data[i].installed !== undefined){
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