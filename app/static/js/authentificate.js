var app_id = 286327544834291;
var namespace = "epflmonsterfriends";
var oauth_url = 'https://www.facebook.com/dialog/oauth/';
var scope = "email,user_online_presence,friends_online_presence";

/* 
	Redirect user to facebook canvas page with scope above
*/

oauth_url += '?client_id=' + app_id;
oauth_url += '&redirect_uri=' + encodeURIComponent('https://apps.facebook.com/' + namespace + '/');
oauth_url += '&scope=' + scope;

if(window.top.location != oauth_url)
		  window.top.location = oauth_url;
