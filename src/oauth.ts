const APIKEY = "AIzaSyCGc0wsEz5wkq59BVae36q_75_gseHlGgY";
var testHere = document.getElementById("test_here")
var isLoggedIn = false;

window.onload = function() {
  const authButton = document.getElementById("auth_button")

  setLoginState();

  // Authentication button functionality
  authButton.addEventListener('click', ()=>{
    setLoginState();
    if(isLoggedIn){
      googleSignin();
    }
    else{
      googleSignout();
    }
    setLoginState();
  });

  // Signin button authentication
  function googleSignin(){
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };  
    });
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

  // Checks if user is logged in and sets button to correct text
  async function setLoginState(){
     chrome.identity.getAuthToken({interactive: false}, ()=>{
      if(chrome.runtime.lastError){
        isLoggedIn =  true;
        authButton.textContent = "Signed out"
      }
      else{
        isLoggedIn = false;
        authButton.textContent = "Signed in";
      }
      });
  }
};



