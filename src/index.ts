var isLoggedIn = false;

window.onload = ()=>{
    var sheetsApiObj = new sheetsApi;
  
    const authButton = document.getElementById("auth_button")
    const mainInterface = document.getElementById("main_interface")
    const postButton = document.getElementById("post_button")
    const test = document.getElementById("test_here");

    sheetsApiObj.getSecrets();

    postButton.addEventListener('click', ()=>{
      sheetsApiObj.postData();
    });

    console.log("index test")
    test.textContent = "popoo"

    // --Authentication--
    setLoginState();    
    
    // Authentication button functionality
    authButton.addEventListener('click', ()=>{
      setLoginState();
      if(!isLoggedIn){
        googleSignin();
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