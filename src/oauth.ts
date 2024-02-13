console.log("oauth.ts running")

  // Signin button authentication
  async function getSigninToken(){
    let token = await chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };  
      chrome.storage.local.set({'token': token}, ()=> {
        console.log('Saved auth token ' + token);
      });
    })
  }


  // Signout authentication
  function googleSignout(){
    var options = {
        'interactive': false,
        'url': 'https://localhost:44344/Account/Logout'
    }
    chrome.identity.launchWebAuthFlow(options, function(redirectUri) {});
    
    options = {
        'interactive': false,
        'url': 'https://accounts.google.com/logout'
    }
    chrome.identity.launchWebAuthFlow(options, function(redirectUri) {});
  }