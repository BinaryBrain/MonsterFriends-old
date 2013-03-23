var oauth_url = 'https://www.facebook.com/dialog/oauth/';

		  oauth_url += '?client_id=APP_ID';
		  oauth_url += '&redirect_uri=' + encodeURIComponent('https://apps.facebook.com/NAMESPACE/');
		  oauth_url += '&scope=user_online_presence,friends_online_presence'

		  window.top.location = oauth_url;