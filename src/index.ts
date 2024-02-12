var isLoggedIn = false;
var authToken;

window.onload = ()=>{
    var sheetsApiObj = new sheetsApi;
  
    const authButton = document.getElementById("auth_button")
    const mainInterface = document.getElementById("main_interface")
    const postButton = document.getElementById("post_button")
    const test = document.getElementById("test_here");

    test.addEventListener('click', ()=>{
      sheetsApiObj.setSheetLocation("test", "test")
    });

    postButton.addEventListener('click', ()=>{
      sheetsApiObj.postData();
    });

    setLoginState();    
    
    // Authentication button functionality
    authButton.addEventListener('click', ()=>{
      setLoginState();
      if(!isLoggedIn){
        getSigninToken();
      }
      else{
        googleSignout();
      }
      setLoginState();
    });

    // Checks if user is logged in and sets button to correct text
    async function setLoginState(){
      chrome.identity.getAuthToken({interactive: false}, ()=>{
       if(chrome.runtime.lastError){
         isLoggedIn =  false;
         authButton.textContent = "Sign in"
         mainInterface.hidden = true
       }
       else{
         isLoggedIn = true;
         authButton.textContent = "Sign out";
         mainInterface.hidden = false
       }
       chrome.runtime.reload;
       });
    }
}